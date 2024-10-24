import GetDBSettings from "@lib/db";
import mysql from 'mysql2/promise';


export let courses: string[];


export default async function getDBData() {
  const mysql = require('mysql2');
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sys',
  });

function fetchCourses() {
    return new Promise((resolve, reject) => {
      connection.query('SELECT c_name FROM courses WHERE instructor_id = 1', (error: any, results: any[]) => {
        if (error) {
          console.log('Cannot connect to db:', error);
          return reject(error); // Reject the promise on error
        }
        const courses = results.map((row: { c_name: any; }) => row.c_name);
        connection.end(); // Close the connection here
        resolve(courses); // Resolve the promise with the courses
      });
    });
  }

  try {
    const courses = await fetchCourses(); // Await the promise
    console.log('Courses:', courses);
    return courses; // Return the courses if needed
  } catch (error) {
    console.error('Error fetching courses:', error);
  }

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
