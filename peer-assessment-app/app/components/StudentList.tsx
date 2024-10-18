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
    valueGetter: (value, row) => `${row.firstName || ''} ${row.lastName || ''}`,
  },
  { field: 'email', headerName: 'Email', width: 200 },

];


{/**TODO: This is temporary and will be removed and replaced with data from the Database. */}
const rows = [
  { id:1, lastName: 'Snow', firstName: 'Jon', email: "snow.jon@got.com" },
  { id:2, lastName: 'Lannister', firstName: 'Cersei', email: "lannister.cersei@got.com" },
  { id:3, lastName: 'Lannister', firstName: 'Jaime', email: "lannister.jaime@got.com" },
  { id:4, lastName: 'Stark', firstName: 'Arya', email: "stark.arya@got.com" },
  { id:5, lastName: 'Targaryen', firstName: 'Daenerys', email:null},
  { id:6, lastName: 'Melisandre', firstName: null , email:null},
  { id:7, lastName: 'Clifford', firstName: 'Ferrara', email:null },
  { id:8, lastName: 'Frances', firstName: 'Rossini', email: null },
  { id:9, lastName: 'Roxie', firstName: 'Harvey', email:null },
];




const paginationModel = { page: 0, pageSize: 5 };

export default function StudentList() {
  return (
    <Paper sx={{ height: "100%", width: '100%', borderRadius: "2em"}}>
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

