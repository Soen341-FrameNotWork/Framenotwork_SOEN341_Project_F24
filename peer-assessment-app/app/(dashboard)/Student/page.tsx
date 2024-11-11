'use client';

import { useRouter } from 'next/navigation'
import CourseCard from "../../components/CourseCard"
import { useEffect, useState } from "react";
import { Box } from "@mui/system";

export default function Home() {
    const [courses, setCourses] = useState([]);
    const router = useRouter();

    const fetchCourses = async () => {
        try {
            const response = await fetch('/api/courses');
            if (!response.ok) {
                throw new Error('Failed to fetch courses');
            }
            const data = await response.json();
            console.log(data);
            setCourses(data);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    };
    

    // Use this function to load courses when needed
    useEffect(() => {
        fetchCourses();
    }, []);

    const handleCourseClick = (courseId:any) => {
        router.push(`Student/course/${courseId}`);
    };

    return(
        
        <Box 
            sx={{
                display: "flex", 
                flexWrap: "wrap", // Ensures items wrap to the next row if needed
                gap: "10px", 
                justifyContent: "flex-start", // Aligns items to the start of the row
                alignItems: "center", // Centers items vertically within each row
                margin: 5,
            }}
        >
        
            {
                courses.map((course, index)  => (
                    <CourseCard key={index} onClick={() => handleCourseClick((course as any).c_id)} row={course} />
                ))
            }
        </Box>
          
        
     
    );
}
