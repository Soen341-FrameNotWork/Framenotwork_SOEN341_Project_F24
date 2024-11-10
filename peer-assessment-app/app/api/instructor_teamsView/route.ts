
import mysql from 'mysql2/promise';

export async function GET() {
  const db = await mysql.createConnection({
    host: process.env.host,
    user: process.env.user,
    password: process.env.password,
    database: process.env.database,
  });

  try {
    const [teams] = await db.query(`
      SELECT t.t_id, t.t_name, s.s_name
      FROM teams t
      JOIN team_student ts ON t.t_id = ts.team_id
      JOIN students s ON ts.student_id = s.s_id
      ORDER BY t.t_id
    `);

    const formattedTeams = teams.reduce((acc, team) => {
      const { t_id, t_name, s_name } = team;
      if (!acc[t_id]) {
        acc[t_id] = { teamName: t_name, students: [] };
      }
      acc[t_id].students.push(s_name);
      return acc;
    }, {});

    return new Response(JSON.stringify(Object.values(formattedTeams)), { status: 200 });
  } 
  catch (error) {
    console.error('Query failed:', error);
    return new Response(JSON.stringify({ error: 'Couldn\'t fetch Teams' }), { status: 500 });
  } 
  finally {
    await db.end();
  }
}
