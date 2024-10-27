import {  NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';

export async function GET() {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user || session.user.role !== 'instructor') {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const query = 'SELECT * FROM courses WHERE instructor_id = ?';
    const db = await mysql.createConnection(GetDBSettings());

    try {
      const [rows] = await db.execute(query, [session.user.id]);
      db.end();
      return NextResponse.json(rows);
    } catch (error) {
      console.error('Database error:', error);
      db.end();
      return NextResponse.json({ error: 'Failed to fetch courses' }, { status: 500 });
    }
  } catch (error) {
    console.error('Session error:', error);
    return NextResponse.json({ error: 'Failed to retrieve session' }, { status: 500 });
  }
}