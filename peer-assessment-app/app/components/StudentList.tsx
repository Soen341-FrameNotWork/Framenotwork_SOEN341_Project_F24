import * as React from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import Paper from '@mui/material/Paper';

const columns: GridColDef[] = [
  { field: 'id', headerName: 'ID', width: 70 },
  { field: 'firstName', headerName: 'First name', width: 130 },
  { field: 'lastName', headerName: 'Last name', width: 130},
  {
    field: 'fullName',
    headerName: 'Full name',
    description: 'This column has a value getter and is not sortable.',
    sortable: false,
    width: 160,
    valueGetter: (value, row) => `${row.s_firstName || ''} ${row.s_lastName || ''}`,
  },
  { field: 'email', headerName: 'Email', width: 200 },

];


{/**TODO: This is temporary and will be removed and replaced with data from the Database. */}
const rows = [
  { id:1, s_id: 1, s_lastName: 'Snow', s_firstName: 'Jon', s_email: "snow.jon@got.com" },
  { id:2, s_id: 2, s_lastName: 'Lannister', s_firstName: 'Cersei', s_email: "lannister.cersei@got.com" },
  { id:3, s_id: 3, s_lastName: 'Lannister', s_firstName: 'Jaime', s_email: "lannister.jaime@got.com" },
  { id:4, s_id: 4, s_lastName: 'Stark', s_firstName: 'Arya', s_email: "stark.arya@got.com" },
  { id:5, s_id: 5, s_lastName: 'Targaryen', s_firstName: 'Daenerys', s_email:null},
  { id:6, s_id: 6, s_lastName: 'Melisandre', s_firstName: null , s_email:null},
  { id:7, s_id: 7, s_lastName: 'Clifford', s_firstName: 'Ferrara', s_email:null },
  { id:8, s_id: 8, s_lastName: 'Frances', s_firstName: 'Rossini', s_email: null },
  { id:9, s_id: 9, s_lastName: 'Roxie', s_firstName: 'Harvey', s_email:null },
];




const paginationModel = { page: 0, pageSize: 5 };

export default function StudentList() {
  return (
    <Paper sx={{ height: "100%", width: '100%' }}>
      <DataGrid
        rows={rows}
        columns={columns}
        initialState={{ pagination: { paginationModel } }}
        pageSizeOptions={[5, 10, 15, 25]}
        checkboxSelection
        sx={{ border: 0 }}
      />
    </Paper>
  );
}

