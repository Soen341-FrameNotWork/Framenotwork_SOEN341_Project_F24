import { useEffect, useState } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import StudentList from '@/app/components/StudentList';

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

function CustomTabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index: number) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

export default function StudentTabs({courseId}: {courseId: number}) {
  const [value, setValue] =useState(0);

  const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
    setValue(newValue);
  };

  const [students, setStudents] = useState([]);
  const course_id = courseId;

  const fetchStudents = async (course_id:number) => {
      try {
          const response = await fetch(`/api/students?courseId=${course_id}`);
          if (!response.ok) {
              throw new Error('Failed to fetch students');
          }
          const data = await response.json();
          setStudents(data);
      } catch (error) {
          console.error('Error fetching students:', error);
      }
  };

  useEffect(() => {
      fetchStudents(course_id);
  }, [course_id]);


  return (
    <Box sx={{ width: '100%'}}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs 
            value={value} 
            onChange={handleChange} 
            textColor='inherit'
            aria-label="secondary tabs example"
        >
          <Tab label="Student List" {...a11yProps(0)} />
          <Tab label="Teams" {...a11yProps(1)} />

        </Tabs>
      </Box>
      <CustomTabPanel value={value} index={0}>
        <StudentList students={students} course_id={course_id}/>
      </CustomTabPanel>
      <CustomTabPanel value={value} index={1}>
        Teams
      </CustomTabPanel>
    </Box>
  );
}