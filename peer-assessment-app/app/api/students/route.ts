import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from "@/app/utils/authOptions";

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

    const session = await getServerSession(authOptions);
    if (!session || !session.user ) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }
    const query = `SELECT S.s_id, S.s_name, S.s_email FROM students S
                   JOIN (SELECT student_id FROM course_student WHERE course_id = ?) AS student_ids
                   ON student_ids.student_id = S.s_id
                   ORDER BY S.s_id;`;
    const params = [courseId];
    // if (session.user.role == 'instructor'){
    //   query = `
    //   SELECT S.s_id, S.s_name, S.s_email FROM students S
    //   JOIN (SELECT student_id FROM course_student WHERE course_id = ?) AS student_ids
    //   ON student_ids.student_id = S.s_id
    //   ORDER BY S.s_id;`;
    //   params = [courseId];
    // }
    // else{
    //   query = `SELECT s.s_id, s.s_name, s.s_email
    //           FROM students s
    //           JOIN team_student ts ON s.s_id = ts.student_id
    //           JOIN teams t ON ts.team_id = t.t_id
    //           WHERE ts.team_id = (
    //               SELECT ts2.team_id
    //               FROM team_student ts2
    //               WHERE ts2.student_id = ? AND ts2.course_id = ?
    //           )
    //           AND ts.course_id = ?;`;
    //   const s_id = session.user.id;
    //   params = [s_id,courseId,courseId];
      
    // }

    

    const db = await mysql.createConnection(GetDBSettings());
    const [rows] = await db.execute(query, params);
    db.commit();
    db.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}

