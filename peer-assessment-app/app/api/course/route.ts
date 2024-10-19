import GetDBSettings from "@lib/db";
import mysql from 'mysql2/promise';


export let courses: string[];

export default async function getDBData()  {
    let query = '';
    let nameField = '';

    query = 'SELECT c_name where instructor_id = 1';
  //  params = [user.instructor_id];
    // nameField = 'c_name';
    // const db = await mysql.createPool({
    // connectionLimit: 10,
    // host: '127.0.0.1',
    // user: 'root',
    // password: 'password',
    // database: 'sys'
    // }); 

    const mysql = require('mysql2');

    const connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'password',
      database: 'sys'
    })

    function fetchCourses() {
      return new Promise((resolve, reject) => {
 connection.query('SELECT c_name FROM courses where instructor_id = 1', (error: any, results: any) => {
    if (error) {
      console.log('cannot connect to db');
    }
    courses = results.map((row: { c_name: any; }) => row.c_name);
    

    connection.end();
 });
}
  )};
  fetchCourses()
  // .then(courses => {
  //   console.log('Courses:', courses);
  // })
  // .catch(error => {
  //   console.error('Error fetching courses:', error);
  // });
}
