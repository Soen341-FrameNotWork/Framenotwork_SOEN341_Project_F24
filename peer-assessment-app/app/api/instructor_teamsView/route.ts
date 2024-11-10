
import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';

interface Team {
  teamName: string;
  students: string[];
}

export async function GET() {
  const db = await mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });


  try {
    const [rows] = await db.query<{ t_id: number; t_name: string; s_name: string }[]>(`
      SELECT t.t_id, t.t_name, s.s_name
      FROM teams t
      JOIN team_student ts ON t.t_id = ts.team_id
      JOIN students s ON ts.student_id = s.s_id
      ORDER BY t.t_id
    `);

    const formattedTeams = rows.reduce((acc: Record<number, Team>, row) => {
      const { t_id, t_name, s_name } = row;
      if (!acc[t_id]) {
        acc[t_id] = { teamName: t_name, students: [] };
      }
      acc[t_id].students.push(s_name);
      return acc;
    }, {} as Record<number, Team>);

    await db.end();

    return NextResponse.json(Object.values(formattedTeams));
  } 
  catch (error) {
    console.error('Query failed:', error);
    return NextResponse.json({ error: 'Couldn\'t fetch Teams' }, { status: 500 });
  } 
}
