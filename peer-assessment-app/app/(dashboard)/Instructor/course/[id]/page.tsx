'use client';
import InstructorTabs from  '../../components/InstructorTabs';

export default function Home({params}: {params: {id: number}}) {
    return(
        <InstructorTabs courseId={params.id}/>
    );
}
