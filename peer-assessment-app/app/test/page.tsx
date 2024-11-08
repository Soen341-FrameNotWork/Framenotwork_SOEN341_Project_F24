'use client'
import InstructorTabs from "../(dashboard)/Instructor/components/InstructorTabs";
import Navbar from "../components/Navbar";
// import StudentTabs from "../components/StudentTabs";

export default function Home() {


    return (
        <>
            <Navbar/>
            <InstructorTabs/>
            {/* <StudentTabs/> */}
        </>
    );
}