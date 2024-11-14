import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseId');

        if (!courseId) {
            console.error('Course ID is missing');
            return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
        }

        const db = await mysql.createConnection(GetDBSettings());

        // First query: Fetch all students in the course with their team information
        const studentQuery = `
            SELECT 
                s.s_id,
                s.s_name,
                IFNULL(t.t_name, 'No team') AS team_name
            FROM 
                students s
            LEFT JOIN 
                team_student ts ON s.s_id = ts.student_id AND ts.course_id = ?
            LEFT JOIN 
                teams t ON ts.team_id = t.t_id
            WHERE 
                s.s_id IN (SELECT student_id FROM course_student WHERE course_id = ?);
        `;

        const [students] = await db.execute(studentQuery, [courseId, courseId]);

        // Second query: Fetch review data for students who have been reviewed
        const reviewQuery = `
            SELECT 
                r.reviewee_id,
                AVG(r.conceptual_score) AS avg_conceptual_score,
                AVG(r.cooperative_score) AS avg_cooperative_score,
                AVG(r.practical_score) AS avg_practical_score,
                AVG(r.work_ethic_score) AS avg_work_ethic_score,
                COUNT(r.reviewer_id) AS count_of_reviews
            FROM 
                ratings r
            JOIN 
                team_student ts ON r.team_id = ts.team_id AND r.reviewee_id = ts.student_id
            WHERE 
                ts.course_id = ?
            GROUP BY 
                r.reviewee_id;
        `;

        const [reviews] = await db.execute(reviewQuery, [courseId]);

        await db.end();

        // Convert reviews array into a map for easy lookup by student ID
        const reviewsMap = new Map();
        (reviews as any[]).forEach((review: any) => {
            reviewsMap.set(review.reviewee_id, review);
        });

        // Merge student data with review data and set default values for those without reviews
        const result = (students as any[]).map((student: any) => {
            const reviewData = reviewsMap.get(student.s_id) || {
                avg_conceptual_score: 0,
                avg_cooperative_score: 0,
                avg_practical_score: 0,
                avg_work_ethic_score: 0,
                count_of_reviews: 0
            };

            return {
                student_id: student.s_id,
                student_name: student.s_name,
                team_name: student.team_name,
                ...reviewData
            };
        });

        // If no students are found, return an empty response
        if (!result || result.length === 0) {
          return NextResponse.json({ message: 'No students found' });
        }

        // Return formatted response with merged data
        return NextResponse.json({
          message: 'Success',
          data: result 
      });

    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
    }
}