import { NextResponse } from "next/server";
import mysql, { RowDataPacket } from "mysql2/promise";
import GetDBSettings from "@lib/db";

interface Team {
  teamName: string;
  students: string[];
}

export const dynamic = "force-dynamic";

export async function GET() {
  const db = await mysql.createConnection(GetDBSettings());

  try {
    console.log("Fetching teams...");
    const [rows] = await db.query<RowDataPacket[]>(`
      SELECT t.t_id, t.t_name, s.s_name
      FROM teams t
      JOIN team_student ts ON t.t_id = ts.team_id
      JOIN students s ON ts.student_id = s.s_id
      ORDER BY t.t_id
    `);

    const formattedTeams = rows.reduce(
      (acc: Record<number, Team>, row: any) => {
        const { t_id, t_name, s_name } = row;
        if (!acc[t_id]) {
          acc[t_id] = { teamName: t_name, students: [] };
        }
        acc[t_id].students.push(s_name);
        return acc;
      },
      {} as Record<number, Team>,
    );

    await db.end();

    return NextResponse.json(Object.values(formattedTeams));
  } catch (error) {
    console.error("Query failed:", error);
    return NextResponse.json(
      { error: "Couldn't fetch Teams" },
      { status: 500 },
    );
  }
}
