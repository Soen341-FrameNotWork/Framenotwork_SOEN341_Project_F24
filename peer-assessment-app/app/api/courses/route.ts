import { NextResponse } from "next/server";
import mysql from "mysql2/promise";
import GetDBSettings from "@lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/utils/authOptions";

// Marking this as a dynamic route to disable static optimization
export const dynamic = "force-dynamic";

export async function GET() {
    try {
        const session = await getServerSession(authOptions);
        console.log("session: ", session);

        if (!session || !session.user) {
            return NextResponse.json(
                { error: "Unauthorized" },
                { status: 401 },
            );
        }

        let query = "";
        console.log("role: ", session.user.role);
        if (session.user.role == "instructor") {
            query = "SELECT * FROM courses WHERE instructor_id = ?";
        } else {
            query =
                "select * from courses C, (SELECT course_id FROM course_student WHERE student_id = ?) as CS WHERE CS.course_id = C.c_id;";
        }

        const db = await mysql.createConnection(GetDBSettings());

        try {
            const [rows] = await db.execute(query, [session.user.id]);
            db.end();
            return NextResponse.json(rows);
        } catch (error) {
            console.error("Database error:", error);
            db.end();
            return NextResponse.json(
                { error: "Failed to fetch courses" },
                { status: 500 },
            );
        }
    } catch (error) {
        console.error("Session error:", error);
        return NextResponse.json(
            { error: "Failed to retrieve session" },
            { status: 500 },
        );
    }
}
