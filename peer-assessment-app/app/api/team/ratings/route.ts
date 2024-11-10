import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';


interface Rating {
  reviewer_name: string | null;
  cooperative_score: number;
  conceptual_score: number;
  practical_score: number;
  work_ethic_score: number;
  overall_score: number;
  comments: {
    cooperative_comment: string | null;
    conceptual_comment: string | null;
    practical_comment: string | null;
    work_ethic_comment: string | null;
  };
}

interface Reviewee {
  reviewee_name: string;
  ratings: Rating[];
}

interface Team {
  teamName: string;
  reviewees: Reviewee[];
}

const processRatingsData = (data: any): Team[] => {
  const teams: { [teamName: string]: { [revieweeName: string]: Reviewee } } = {};

  // Loop through each row of data
  data.forEach((row: any) => {
    const { team_name, reviewee_name } = row;

    // Initialize the team if not already present
    if (!teams[team_name]) {
      teams[team_name] = {};
    }

    // Initialize the reviewee if not already present in the team
    if (!teams[team_name][reviewee_name]) {
      teams[team_name][reviewee_name] = {
        reviewee_name,
        ratings: [],
      };
    }

    // Add the rating to the corresponding reviewee in the team
    teams[team_name][reviewee_name].ratings.push({
      reviewer_name: row.reviewer_name,
      cooperative_score: row.cooperative_score,
      conceptual_score: row.conceptual_score,
      practical_score: row.practical_score,
      work_ethic_score: row.work_ethic_score,
      overall_score: row.overall_score,
      comments: {
        cooperative_comment: row.cooperative_comment,
        conceptual_comment: row.conceptual_comment,
        practical_comment: row.practical_comment,
        work_ethic_comment: row.work_ethic_comment,
      },
    });
  });

  // Convert the nested object into an array of teams with reviewees
  return Object.keys(teams).map((teamName) => ({
    teamName,
    reviewees: Object.values(teams[teamName]),
  }));
};
// The rest of your API route remains unchanged

// Marking this as a dynamic route to disable static optimization
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');
    if (!courseId) {
      console.error('Course ID is missing');
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const query = `SELECT 
                    S_reviewee.s_name AS reviewee_name, 
                    S_reviewer.s_name AS reviewer_name,
                    T.t_name as team_name,
                    R.cooperative_score, 
                    R.cooperative_comment, 
                    R.conceptual_score, 
                    R.conceptual_comment, 
                    R.practical_score, 
                    R.practical_comment, 
                    R.work_ethic_score, 
                    R.work_ethic_comment,
                    R.overall_score
                  FROM ratings R
                  JOIN students S_reviewer ON R.reviewer_id = S_reviewer.s_id
                  JOIN students S_reviewee ON R.reviewee_id = S_reviewee.s_id
                  JOIN team_student TS ON S_reviewee.s_id = TS.student_id
                  JOIN teams as T ON T.t_id = R.team_id
                  WHERE T.course_id = ?;`;

    const params = [courseId];
    const db = await mysql.createConnection(GetDBSettings());
    const [rows] = await db.execute(query, params);
    db.end();

    return NextResponse.json(processRatingsData(rows));
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {



}