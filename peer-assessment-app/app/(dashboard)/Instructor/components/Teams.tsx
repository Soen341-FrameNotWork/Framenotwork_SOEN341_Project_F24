import { FormControl, InputLabel, Select, MenuItem, SelectChangeEvent, Typography, Box, ListItemText, Button } from "@mui/material";
import React, { useEffect, useState } from "react";

interface Student{
    s_id: number,
    s_name: string | null,
    s_email: string | null,
    s_password: string,
  }
  
  interface StudentListProps {
    students: Student[];
    course_id: number | string
  }

export default function Teams({students, course_id}: StudentListProps) {
    const [teamsData, setTeamsData] = useState([]);
    useEffect(() => {
        const fetchTeamsData = async () => {
          try {
            const response = await fetch(`/api/team/ratings?courseId=${course_id}`);
            const data = await response.json();
            setTeamsData(data);
          } catch (error) {
            console.error('Error fetching teams data:', error);
          }
        };
    
        fetchTeamsData();
      }, [course_id]);
      
    const [student, setStudent] = React.useState('');
    const [team, setTeam] = React.useState('');

    const handleStudentChange = (event: SelectChangeEvent) => {
        setStudent(event.target.value as string);
    };
    
    const handleTeamChange = (event: SelectChangeEvent) => {
        setTeam(event.target.value as string);
    };

    const handleConfirm = () => {
        if (student.length === 0) {
            alert('Select a student and a team!');
            return;
        }

    console.log((team as any).teamId)
    console.log(student)
    console.log(course_id)

        fetch('/api/change-team', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ student: student, course_id: course_id, team_id: (team as any).teamId}), // Convert the array to JSON
          })
          .then(response => {
            if (!response.ok) {
              throw new Error('Network response was not ok');
            }
            return response.json();
          })
          .then(data => {
            console.log('Success:', data);
            alert('Student has changed team successfully!');
          })
          .catch((error) => {
            console.error('Error:', error);
            alert('Failed to change team.');
          });
    }

    console.log(teamsData);

    
    return (
      <>
        <Box sx={{ maxWidth: 300 }}>
        <Typography>
            <label>
        Change a student's team
            </label>
        </Typography>
        <FormControl fullWidth>
        <InputLabel id="student-select-label">Student</InputLabel>
        <Select
            labelId="student-select-label-id"
            id="student-select"
            value={student}
            label="Student"
            onChange={handleStudentChange}
        >
            {students.map((student) => (
            <MenuItem key={(student as any).s_name} value={(student as any)}>
                <ListItemText primary={(student as any).s_name} />
            </MenuItem>
          ))}
           
        </Select>
        </FormControl>
        <FormControl fullWidth>
        <InputLabel id="team-select-label">Team</InputLabel>
        <Select
            labelId="team-select-label-id"
            id="team-select"
            value={team}
            label="Team"
            onChange={handleTeamChange}
        >
            {teamsData.map((team) => (
            <MenuItem key={(team as any).teamName} value={(team as any)}>
              <ListItemText primary={(team as any).teamName} />
            </MenuItem>
          ))}
        </Select>
        </FormControl>
        <Button variant="contained" color="primary" onClick={handleConfirm} sx={{ float: "right" }}>
          Change Team
        </Button>
        </Box>
      </>
    );
  }