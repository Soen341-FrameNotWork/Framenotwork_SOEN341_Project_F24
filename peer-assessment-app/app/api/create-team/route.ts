import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';
import { NextApiRequest } from 'next';

interface RequestParams{
    students:({
        id: number;
        s_id: number;
        s_lastName: string;
        s_firstName: string;
        s_email: string | null;
    } | undefined)[],
    course_id:string,
    team_name:string
}

export async function POST(req: NextApiRequest) {
    try {
        const { students, course_id, team_name }: RequestParams = req.body;

        if (!students || !course_id || !team_name) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (students.length === 0) {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        const db = await mysql.createConnection(GetDBSettings());

        // Start a transaction
        await db.beginTransaction();

        try {
            // Insert the new team
            const [teamResult] = await db.query(
                "INSERT INTO teams (t_name, course_id) VALUES (?, ?)",
                [team_name, course_id]
            );

            // Get the newly inserted team's ID
            const teamId = (teamResult as mysql.ResultSetHeader).insertId;

            // Prepare values for inserting into team_student
            const studentValues = students.map(studentId => [teamId, studentId]);

            // Insert student-team associations
            await db.query(
                "INSERT INTO team_student (team_id, student_id) VALUES ?",
                [studentValues]
            );

            // Commit the transaction
            await db.commit();

            return NextResponse.json({ message: 'Team created successfully' }, { status: 200 });
        } catch (error) {
            // Rollback transaction in case of error
            await db.rollback();
            console.error('Error during transaction:', error);
            return NextResponse.json({ error: 'Error inserting data' }, { status: 500 });
        } finally {
            // Close the database connection
            await db.end();
        }
    } catch (error) {
        console.error('Error connecting to database:', error);
        return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
    }
}
