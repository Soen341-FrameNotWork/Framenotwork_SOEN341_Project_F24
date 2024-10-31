'use client'
// import Sidebar from "./components/Sidebar";
import Box from "@mui/material/Box";
import CourseCard from "../components/CourseCard"
import StudentList from "../components/StudentList";
import LeftSidebar from "../components/LeftSidebar";
import { Typography } from "@mui/material";
// import FormDialog from "../components/ClassCreation";
import { useEffect, useState } from "react";
import { Session } from "next-auth";




export default function Home() {
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const [students, setStudents] = useState([]);
    const [courses, setCourses] = useState([]);
    const [session, setSession] = useState<Session | null>(null);

    // useEffect(() => {
    //     fetch('/api/protected')
    //     .then((res) => res.json())
    //     .then((data) => setSession(data))
    //     .catch((error) => console.error('Error fetching session:', error));
    // }, []);

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
        fetch('/api/protected')
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch((error) => console.error('Error fetching session:', error));
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
        {/* This is a template of the course dashboard to be implemented later */}

        <LeftSidebar />
        <Box sx={{display: "flex", flexWrap: "wrap", marginLeft: "100px", padding: "10px", gap:"7px"}}>
            <Box sx={{width: "100%", marginBottom: "20px"}}>
                <Typography variant="h4">
                    Welcome {session?.user?.name}!
                </Typography>
                {/* <Divider sx={{bgcolor: "black", border: "1px solid black", width: "400px", margin: ""}}/> */}
            </Box>
            {selectedCourseId === null ? (
                    courses.map((course, index)  => (
                        <CourseCard key={index} onClick={() => handleCourseClick((course as any).c_id)} row={course} />
                    ))
                ) : (<StudentList students={students} course_id={selectedCourseId} />)
            }
          {/* <FormDialog/> */}
        </Box> 
                
        
        {/* <Sidebar/> */}
        
        </>
    );
}
