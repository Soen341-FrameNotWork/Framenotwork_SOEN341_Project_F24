'use client'
// import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import CourseCard from "../components/CourseCard"
// import { Divider, Stack, Typography } from "@mui/material";
// import { Padding } from "@mui/icons-material";
import StudentList from "../components/StudentList";
import LeftSidebar from "../components/LeftSidebar";
import { Typography } from "@mui/material";
import FormDialog from "../components/ClassCreation";
import { useEffect, useState } from "react";



export default function Home() {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    

    const fetchStudents = async (courseId: any) => {
        try {
            const response = await fetch(`/api/students?courseId=${courseId}`);
            if (!response.ok) {
                throw new Error('Failed to fetch students');
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error('Error fetching students:', error);
        }
    };

    const fetchInstructorCourses = async () => {
        try {
            const response = await fetch('/api/instructor_courses');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    
    // Use this function to load courses when needed
    useEffect(() => {
        fetchInstructorCourses();
    }, []);

    
        useEffect(() => {
        if (selectedCourseId !== null) {
            fetchStudents(selectedCourseId);
        }
    }, [selectedCourseId]);

    const handleCourseClick = (courseId:any) => {
        setSelectedCourseId(courseId);
    };

    return(
        <>
        {/* <Box sx={{display: "flex", flexWrap: "wrap",border: "2px solid white", margin: "80px", padding: "30px 30px 30px 30px",  gap:"7px"}}> */}
            {/* <Stack direction="row" divider={<Divider orientation="vertical" flexItem />} spacing={2} useFlexGap sx={{ flexWrap: "wrap" }}>
                {...components}
            </Stack> */}
            {/* <Typography></Typography>
            <StudentList/>
        </Box> */}

        {/* This is a template of the course dashboard to be implemented later */}
        <LeftSidebar />
        <Box sx={{display: "flex", flexWrap: "wrap", marginLeft: "100px", padding: "10px", gap:"7px"}}>
            <Box sx={{width: "100%", marginBottom: "20px"}}>
                <Typography variant="h4">
                    Hi Ms. Joumana!
                </Typography>
                {/* <Divider sx={{bgcolor: "black", border: "1px solid black", width: "400px", margin: ""}}/> */}
            </Box>
            {/* {rows.map((row:any, index:number) => 
                (<CourseCard key={index} onClick={()=>{handleCourseClick(row.course_id)}} row={row} />))
            } */}
            {selectedCourseId === null ? (
                    courses.map((course, index)  => (
                        <CourseCard key={index} onClick={() => handleCourseClick((course as any).c_id)} row={course} />
                    ))
                ) : (<StudentList students={students} />)
            }
          
          <FormDialog/>
        </Box> 
                
        
        {/* <Sidebar/> */}
        
        </>
    );
}
