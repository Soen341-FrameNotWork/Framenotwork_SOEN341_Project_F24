import { 
  FormControl, 
  InputLabel, 
  Select, 
  MenuItem, 
  SelectChangeEvent, 
  Typography, 
  Box, 
  ListItemText, 
  Button, 
  Dialog, 
  DialogActions, 
  DialogContent, 
  DialogTitle 
} from "@mui/material";
import React, { useEffect, useState } from "react";

interface Student {
  s_id: number;
  s_name: string | null;
  s_email: string | null;
  s_password: string;
}

interface StudentListProps {
  students: Student[];
  course_id: number | string;
  onTeamChange: () => void;
}

export default function Teams({ students, course_id, onTeamChange}: StudentListProps) {
  const [teamsData, setTeamsData] = useState([]);
  
  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await fetch(`/api/teams/ratings?courseId=${course_id}`);
        const data = await response.json();
        setTeamsData(data);
      } catch (error) {
        console.error('Error fetching teams data:', error);
      }
    };

    fetchTeamsData();
  }, [course_id]);

  const [student, setStudent] = useState('');
  const [team, setTeam] = useState('');
  
  // State for controlling the dialog visibility
  const [openDialog, setOpenDialog] = useState(false);

  const handleStudentChange = (event: SelectChangeEvent) => {
    setStudent(event.target.value as string);
  };

  const handleTeamChange = (event: SelectChangeEvent) => {
    setTeam(event.target.value as string);
  };

  const handleConfirm = () => {
    if (student.length === 0 || team.length === 0) {
      alert('Select a student and a team!');
      return;
    }

    fetch('/api/change-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ student: student, course_id: course_id, team_id: (team as any).teamId }),
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
        handleCloseDialog(); // Close the dialog on success
        onTeamChange(); // Trigger refetch of teams after successful submission
      })
      .catch((error) => {
        console.error('Error:', error);
        alert('Failed to change team.');
      });
  };

  // Handlers for opening and closing the dialog
  const handleOpenDialog = () => setOpenDialog(true);
  
  const handleCloseDialog = () => setOpenDialog(false);

  return (
    <>
      {/* Button to open the dialog */}
      <Box sx={{ display: 'flex', justifyContent: 'flex-end', mb: 2 }}>
        <Button variant="contained" color="primary" onClick={handleOpenDialog} sx={{ marginRight: '16px' }}>
          Edit Teams
        </Button>
      </Box>

      {/* Dialog for selecting student and team */}
      <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
        <DialogTitle>Edit Team Assignment</DialogTitle>
        
        <DialogContent>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            {/* Student Select */}
            <FormControl fullWidth>
              <InputLabel id="student-select-label">Student</InputLabel>
              <Select
                labelId="student-select-label"
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

            {/* Typography for "to" or arrow */}
            <Typography>→</Typography>

            {/* Team Select */}
            <FormControl fullWidth>
              <InputLabel id="team-select-label">Team</InputLabel>
              <Select
                labelId="team-select-label"
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
          </Box>
        </DialogContent>

        {/* Actions for submitting or closing */}
        <DialogActions>
          <Button onClick={handleCloseDialog} color="secondary">
            Cancel
          </Button>
          <Button onClick={handleConfirm} variant="contained" color="primary">
            Submit
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}