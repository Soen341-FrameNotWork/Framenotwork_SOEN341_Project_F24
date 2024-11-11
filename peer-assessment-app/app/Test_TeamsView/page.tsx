'use client'
import InstructorTabs from "../(dashboard)/Instructor/components/InstructorTabs";
import Navbar from "../components/Navbar";


export default function Home() {
	
	return (
		<>
			<Navbar/>
			<InstructorTabs courseId={1}/>
		</>
	);
}