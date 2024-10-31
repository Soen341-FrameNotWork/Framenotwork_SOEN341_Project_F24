import {useState} from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@mui/material';

const columns: GridColDef[] = [

  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130},
  { field: 's_id', headerName: 'Student ID', width: 130 },
  { field: 'email', headerName: 'Email', width: 200 },
];


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

export default function StudentList({students, course_id}: StudentListProps) {
  console.log(students);
  const rows = students.map((student, index) => {
    const fullname = student.s_name;
    const firstName  = fullname?fullname.split(' ',1)[0]:'';
    const lastName = fullname?fullname.split(' ').slice(1).join(' '):'';
    return {
      id: index,
      s_id: student.s_id,
      lastName: lastName,
      firstName: firstName,
      email: student.s_email,
      s_name:fullname
    }
  });

  const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
  const [open, setOpen] = useState(false);
  const [teamName, setTeamName] = useState<string>('');
  
  const handleCreateTeam = () => {
    if (selectedRows.length === 0) {
      alert('Select students');
      return;
    }
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {

    console.log('selected rows: ',selectedRows);

    const selectedStudents = selectedRows.map((selected_row) => {
      return rows.find(row => row.s_id === selected_row);
    }


  
  
  );
  

    fetch('/api/create-team', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ students: selectedStudents, course_id: course_id, team_name:teamName}), // Convert the array to JSON
    })
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      console.log('Success:', data);
      alert('Team created successfully!');
    })
    .catch((error) => {
      console.error('Error:', error);
      alert('Failed to create team');
    })
    .finally(() => {
      setOpen(false);
      setSelectedRows([]);
    });

    
  };

  

// if (!rows){
//   rows   = [
//       { id:1, s_id: 1, s_lastName: 'Snow', s_firstName: 'Jon', s_email: "snow.jon@got.com" },
//       { id:2, s_id: 2, s_lastName: 'Lannister', s_firstName: 'Cersei', s_email: "lannister.cersei@got.com" },
//       { id:3, s_id: 3, s_lastName: 'Lannister', s_firstName: 'Jaime', s_email: "lannister.jaime@got.com" },
//       { id:4, s_id: 4, s_lastName: 'Stark', s_firstName: 'Arya', s_email: "stark.arya@got.com" },
//       { id:5, s_id: 5, s_lastName: 'Targaryen', s_firstName: 'Daenerys', s_email:null},
//       { id:6, s_id: 6, s_lastName: 'Melisandre', s_firstName: null , s_email:null} as any,
//       { id:7, s_id: 7, s_lastName: 'Clifford', s_firstName: 'Ferrara', s_email:null },
//       { id:8, s_id: 8, s_lastName: 'Frances', s_firstName: 'Rossini', s_email: null },
//       { id:9, s_id: 9, s_lastName: 'Roxie', s_firstName: 'Harvey', s_email:null },
//     ];
// }
  // const rows = [
  //   { id:1, s_id: 1, s_lastName: 'Snow', s_firstName: 'Jon', s_email: "snow.jon@got.com" },
  //   { id:2, s_id: 2, s_lastName: 'Lannister', s_firstName: 'Cersei', s_email: "lannister.cersei@got.com" },
  //   { id:3, s_id: 3, s_lastName: 'Lannister', s_firstName: 'Jaime', s_email: "lannister.jaime@got.com" },
  //   { id:4, s_id: 4, s_lastName: 'Stark', s_firstName: 'Arya', s_email: "stark.arya@got.com" },
  //   { id:5, s_id: 5, s_lastName: 'Targaryen', s_firstName: 'Daenerys', s_email:null},
  //   { id:6, s_id: 6, s_lastName: 'Melisandre', s_firstName: null , s_email:null},
  //   { id:7, s_id: 7, s_lastName: 'Clifford', s_firstName: 'Ferrara', s_email:null },
  //   { id:8, s_id: 8, s_lastName: 'Frances', s_firstName: 'Rossini', s_email: null },
  //   { id:9, s_id: 9, s_lastName: 'Roxie', s_firstName: 'Harvey', s_email:null },
  // ];
  
  return (
    <Paper sx={{ height: "100%", width: '100%', padding: "16px" }}>
      <Typography variant="h6" gutterBottom>
        Students
        <Button variant="contained" color="primary" onClick={handleCreateTeam} sx={{ float: "right" }}>
          Create Team
        </Button>
      </Typography>
      <DataGrid
        rows={rows}
        columns={columns}
        pageSizeOptions={[5, 10, 15, 25]}
        checkboxSelection
        onRowSelectionModelChange={(newSelection) => setSelectedRows(newSelection)}
        sx={{ border: 0, height: "400px", width: '100%' }}
      />
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Team Summary</DialogTitle>
        <DialogContent>
          <Typography>Selected Students:</Typography>
            <ul>
              {selectedRows.map((id) => {
                console.log(id);
                const student = rows.find(row => row.s_id === id);
                return <li key={id}>{student?.s_name}</li>;
              })}
            </ul>
            <TextField
            autoFocus
            margin="dense"
            label="Team Name"
            type="text"
            fullWidth
            variant="outlined"
            value={teamName}
            onChange={(e) => setTeamName(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleConfirm} color="primary">Confirm</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
}

