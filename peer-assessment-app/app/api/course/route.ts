import GetDBSettings from "@lib/db";
import mysql from 'mysql2/promise';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";


export default async function getCourses() {
  const session = await getServerSession(authOptions);

  if (session && session.user) {
    const query = 'SELECT * FROM courses WHERE instructor_id = ?';
    const db = await mysql.createConnection(GetDBSettings());

    try {
      const [rows]: any = await db.execute(query, [session.user.id]);
      db.end();

      // Extract c_name values
      // const courseNames = {}
      // rows.map((row: any) => row.c_id : row.c_name );
      

      return rows;
    } catch (error) {
      console.error('Database error:', error);
      db.end();
      throw error;
    }
  }

  return [];
}



// export default async function getDBData()  {
//     let query = '';
//     let nameField = '';

//     query = 'SELECT c_name where instructor_id = 1';
//   //  params = [user.instructor_id];
//     // nameField = 'c_name';
//     // const db = await mysql.createPool({
//     // connectionLimit: 10,
//     // host: '127.0.0.1',
//     // user: 'root',
//     // password: 'password',
//     // database: 'sys'
//     // }); 

//     const mysql = require('mysql2');

//     const connection = mysql.createConnection({
//       host: 'localhost',
//       user: 'root',
//       password: 'password',
//       database: 'sys'
//     })

//     function fetchCourses() {
//       return new Promise((resolve, reject) => {
//  connection.query('SELECT c_name FROM courses where instructor_id = 1', (error: any, results: any) => {
//     if (error) {
//       console.log('cannot connect to db');
//     }
//     courses = results.map((row: { c_name: any; }) => row.c_name);
    

//     connection.end();
//  });
// }
//   )};
//   fetchCourses()
//   // .then(courses => {
//   //   console.log('Courses:', courses);
//   // })
//   // .catch(error => {
//   //   console.error('Error fetching courses:', error);
//   // });
