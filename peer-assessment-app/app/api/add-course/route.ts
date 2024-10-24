import GetDBSettings from "@lib/db";
import mysql from 'mysql2/promise';

export default async function createCourse(c_name: string, instructor_id: number) {
  const mysql = require('mysql2');
  console.log('i go here 2');
  mysql.close
  const connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'password',
    database: 'sys',
  });

  console.log('i go here 3');
  try {
    const query = 'INSERT INTO courses (c_name, instructor_id) VALUES (?, ?)';
    console.log("i got here 3"); // This should log if the code is reached
    
    const [results] = connection.execute(query, [c_name, instructor_id]);
    console.log('Course added!', results);
    return results; // Return the results if needed
  } catch (error) {
    console.error('Error adding course:', error);
  } finally {
    connection.end(); // Ensure the connection is closed
  }
}
