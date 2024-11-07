'use client';
import StudentList from "@/app/components/StudentList";
import { useMemo, useState } from "react";

export default function Home({params}: {params: {id: string}}) {
    const [students, setStudents] = useState([]);
    const course_id = params.id;

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
    

    // Use this function to load courses when needed
    useMemo(() => {
        fetchStudents(course_id);
    }, [course_id]);

    return(
        
        <>
            {/* <div style={{ display: "flex", flexWrap: "wrap", gap: "7px" }}> */}
            {
                <StudentList students={students} course_id={course_id}/>
            }
            {/* </div> */}
        </>
    );
}
