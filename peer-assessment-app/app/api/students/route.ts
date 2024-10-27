import { NextRequest, NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const courseId = searchParams.get('courseId');

    if (!courseId) {
      console.error('Course ID is missing');
      return NextResponse.json({ error: 'Course ID is required' }, { status: 400 });
    }

    const query = `
      SELECT S.* FROM students S
      JOIN (SELECT student_id FROM course_student WHERE course_id = ?) AS student_ids
      ON student_ids.student_id = S.s_id
      ORDER BY S.s_id;`;

    const db = await mysql.createConnection(GetDBSettings());
    const [rows] = await db.execute(query, [courseId]);
    db.end();

    return NextResponse.json(rows);
  } catch (error) {
    console.error('Database error:', error);
    return NextResponse.json({ error: 'Failed to fetch students' }, { status: 500 });
  }
}