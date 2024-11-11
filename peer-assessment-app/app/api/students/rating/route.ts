import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/utils/authOptions";

// Function to calculate average scores
function calculateAverageScores(ratings: any[]): {
    scores: {
        cooperative_score: number;
        conceptual_score: number;
        practical_score: number;
        work_ethic_score: number;
        overall_score: number;
    };
    
} {
    const scoresSum = {
        cooperative_score: 0,
        conceptual_score: 0,
        practical_score: 0,
        work_ethic_score: 0,
    };

    const scoresCount = {
        cooperative_score: 0,
        conceptual_score: 0,
        practical_score: 0,
        work_ethic_score: 0,
    };

    // Loop through each rating and sum up the values
    ratings.forEach((rating) => {
        if (rating.cooperative_score !== null) {
            scoresSum.cooperative_score += rating.cooperative_score;
            scoresCount.cooperative_score += 1;
        }
        if (rating.conceptual_score !== null) {
            scoresSum.conceptual_score += rating.conceptual_score;
            scoresCount.conceptual_score += 1;
        }
        if (rating.practical_score !== null) {
            scoresSum.practical_score += rating.practical_score;
            scoresCount.practical_score += 1;
        }
        if (rating.work_ethic_score !== null) {
            scoresSum.work_ethic_score += rating.work_ethic_score;
            scoresCount.work_ethic_score += 1;
        }
    });

    // Calculate averages for each category
    const categoryAverageScores = {
        cooperative_score:
            scoresCount.cooperative_score > 0
                ? parseFloat((scoresSum.cooperative_score / scoresCount.cooperative_score).toFixed(1))
                : 0,
        conceptual_score:
            scoresCount.conceptual_score > 0
                ? parseFloat((scoresSum.conceptual_score / scoresCount.conceptual_score).toFixed(1))
                : 0,
        practical_score:
            scoresCount.practical_score > 0
                ? parseFloat((scoresSum.practical_score / scoresCount.practical_score).toFixed(1))
                : 0,
        work_ethic_score:
            scoresCount.work_ethic_score > 0
                ? parseFloat((scoresSum.work_ethic_score / scoresCount.work_ethic_score).toFixed(1))
                : 0,
    };

    

    // Calculate overall average as an average of all category averages
    const overallAverage =
        ((categoryAverageScores.cooperative_score +
            categoryAverageScores.conceptual_score +
            categoryAverageScores.practical_score +
            categoryAverageScores.work_ethic_score) /
        4).toFixed(1);

   const averageScores = {
        ...categoryAverageScores,
        overall_score: parseFloat(overallAverage)
    };

    return {
        scores: averageScores
    };
}

export async function GET(req: NextRequest) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get('courseId');

        if (!courseId) {
            console.error('Course ID is missing');
            return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
        }

        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // SQL query to fetch ratings for the student in a specific course
        const query = `
            SELECT 
                r.cooperative_score, 
                r.conceptual_score, 
                r.practical_score, 
                r.work_ethic_score
            FROM 
                ratings r
            JOIN 
                team_student ts ON r.team_id = ts.team_id
            JOIN 
                teams t ON ts.team_id = t.t_id
            WHERE 
                ts.course_id = ?          -- Placeholder for course_id
            AND 
                ts.student_id = ?         -- Placeholder for student_id (the reviewee)
            AND 
                r.reviewee_id = ts.student_id;`;

        const s_id = session.user.id; // Get student ID from session user object
        // const s_id = 2; // Hardcoded student ID for testing
        const params = [courseId, s_id];

        const db = await mysql.createConnection(GetDBSettings());
        
        // Execute query and fetch ratings data
        const [rows]  = (await db.execute(query, params) as any[]);
        
        await db.commit();
        
        await db.end();

        // If no ratings are found, return an empty response
        if (!rows || rows.length === 0) {
          return NextResponse.json({ message: 'No ratings found' });
        }

        // Calculate average ratings using our helper function
        const result = calculateAverageScores(rows);

        // Return formatted response with calculated averages
        return NextResponse.json({
          message: 'Success',
          data: result,
          raw_ratings: rows // Optional, include raw ratings if needed for debugging or additional info.
      });

    } catch (error) {
      console.error('Database error:', error);
      return NextResponse.json({ error: 'Failed to fetch ratings' }, { status: 500 });
    }
}