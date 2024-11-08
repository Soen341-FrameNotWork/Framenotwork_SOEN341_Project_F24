import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { TableVirtuoso, TableComponents } from 'react-virtuoso';

interface Data {
  id: number;
  firstName: string;
  lastName: string;
  team: string;
  phone: string;
}

interface ColumnData {
  dataKey: keyof Data;
  label: string;
  numeric?: boolean;
  width?: number;
}

// TODO: Change to db data
const chance = { 
    s_id: 40000000,
    firstName: "Mathieu",
    lastName: "Pare",
    team: 'team1',
    phone: '6.8',

}

function createData(): Data {
  return {
    id: chance.s_id,
    firstName: chance.firstName,
    lastName: chance.lastName,
    team: chance.team,
    phone: chance.phone
  };
}

const columns: ColumnData[] = [
  {
    width: 130,
    label: 'Student ID',
    dataKey: 'id',
  },
  {
    width: 100,
    label: 'First Name',
    dataKey: 'firstName',
  },
  {
    width: 100,
    label: 'Last Name',
    dataKey: 'lastName',
  },
  {
    width: 50,
    label: 'Team',
    dataKey: 'team',
    numeric: true,
  },
  {
    width: 130,
    label: 'Cooperation',
    dataKey: 'phone',
  },
  {
    width: 130,
    label: 'Conceptual Contribution',
    dataKey: 'phone',
  },
  {
    width: 130,
    label: 'Practical Contribution',
    dataKey: 'phone',
  },
  {
    width: 130,
    label: 'Work Ethic',
    dataKey: 'phone',
  },
  {
    width: 130,
    label: 'Average',
    dataKey: 'phone',
  },
  {
    width: 130,
    label: 'Peers who reviewed',
    dataKey: 'phone',
  }
];

const rows: Data[] = Array.from({ length: 100 }, () => createData());

const VirtuosoTableComponents: TableComponents<Data> = {
  Scroller: React.forwardRef<HTMLDivElement>((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table {...props} sx={{ borderCollapse: 'separate', tableLayout: 'fixed' }} />
  ),
  TableHead: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef<HTMLTableSectionElement>((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow >
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align= {'center'}
          sx={{ backgroundColor: '#7f7f7f' }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index: number, row: Data) {
  return (
    <React.Fragment>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={ 'center' }
        >
          {row[column.dataKey]}
        </TableCell>
      ))}
    </React.Fragment>
  );
}

export default function ReactVirtualizedTable() {
  return (
    <Paper style={{ height: 600, width: '100%' }}>
      <TableVirtuoso
        data={rows}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
}
