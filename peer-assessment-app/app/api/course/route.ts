import GetDBSettings from "@lib/db";
import mysql from 'mysql2/promise';

let courses = []

export default async function getDBData(): Promise<string[]>  {
    let query = '';
    let params: any = [];
    let nameField = '';

    query = 'SELECT c_name, where instructor_id = ?';
    params = [user.instructor_id];
    nameField = 'c_name';

const db = await mysql.createConnection(GetDBSettings());
const [rows]: any = await db.execute(query, params);

if (rows.length === 0) {
    // No user found
    return [];
}

courses = rows;
return courses;
}
