import { NextRequest, NextResponse } from "next/server";
import mysql from "mysql2/promise";
import GetDBSettings from "@lib/db";
import { authOptions } from "@/app/utils/authOptions";
import { getServerSession } from "next-auth/next";

export const dynamic = "force-dynamic";

interface Teammate {
    s_id: number;
    s_name: string;
    team_id: number;
}

export async function GET(req: NextRequest) {
    const db = await mysql.createConnection(GetDBSettings());
    let session = null;
    const { searchParams } = new URL(req.url);
    const courseId = searchParams.get("courseId");
    try {
        // Ensure both req and res are passed to getServerSession
        session = await getServerSession(authOptions);
        // console.log("session: ",session);

        if (!session) {
            return NextResponse.json(
                { message: "You must be logged in." },
                { status: 401 },
            );
        }

        if (!session.user || session.user.role !== "student") {
            return NextResponse.json(
                { error: "Unauthorized user role" },
                { status: 401 },
            );
        }
    } catch (error) {
        console.error("Error in GET handler:", error);
        return NextResponse.json({ message: "Server Error" }, { status: 500 });
    }

    try {
        console.log("Fetching teams...");
        console.log("courseId:", courseId);
        console.log("session:", session.user.id);
        const query = `SELECT s.s_id, s.s_name, ts.team_id
    FROM students s
    JOIN team_student ts ON s.s_id = ts.student_id
    JOIN teams t ON ts.team_id = t.t_id
    WHERE ts.team_id = (
      SELECT ts2.team_id
      FROM team_student ts2
      WHERE ts2.student_id = ? AND ts2.course_id = ?
    )
    AND ts.course_id = ?`;
        const s_id = session.user.id;
        const [rows] = await db.execute(query, [s_id, courseId, courseId]);
        console.log("Fetched teams:", rows);

        const filteredRows = (rows as Teammate[]).filter(
            (row: any) => row.s_id !== session.user.id,
        );

        db.commit();
        db.end();
        return NextResponse.json(filteredRows);
    } catch (error) {
        console.error("Query failed:", error);
        return NextResponse.json(
            { error: "Couldn't fetch Teams" },
            { status: 500 },
        );
    }
}
