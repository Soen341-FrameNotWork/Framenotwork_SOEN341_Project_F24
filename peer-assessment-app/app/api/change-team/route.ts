import { NextResponse } from 'next/server';
import mysql from 'mysql2/promise';
import GetDBSettings from '@lib/db';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { NextApiRequest } from 'next';

interface RequestParams{
    student:({
        id: number;
        s_id: number;
        s_lastName: string;
        s_firstName: string;
        s_email: string | null;
    } | undefined)[],
    course_id:string,
    team_id:string
}

export async function POST(req: Request) {

    try {
        const body = await req.json();
        const { student, course_id, team_id }: 
        RequestParams = body;

        if (!student || !course_id || !team_id) {
            return  NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
        }

        if (student.length === 0) {
            return NextResponse.json({ error: 'Invalid input data' }, { status: 400 });
        }

        const db = await mysql.createConnection(GetDBSettings());

        await db.beginTransaction();

        try {
            console.log((student as any).s_if)
            const [teamResult] = await db.query(
                `UPDATE team_student 
                SET team_id = ? 
                WHERE student_id = ? AND course_id = ?`,
                [team_id, (student as any).s_id, course_id]
            );

            await db.commit();

            return NextResponse.json({ message: 'Team change successful.' }, { status: 200 });

        } catch (error) {
            // Rollback transaction in case of error
            await db.rollback();
            console.error('Error during transaction:', error);
            return NextResponse.json({ error: 'Error updating data' }, { status: 500 });
        } finally {
            // Close the database connection
            await db.end();
        }

    } catch (error) {
        console.error('Error connecting to database:', error);
        return NextResponse.json({ error: 'Error connecting to database' }, { status: 500 });
    }


}
