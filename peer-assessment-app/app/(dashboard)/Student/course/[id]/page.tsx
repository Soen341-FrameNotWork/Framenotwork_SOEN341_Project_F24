"use client";
import StudentTabs from "../../components/StudentTabs";
export default function Home({ params }: { params: { id: number } }) {
    return <StudentTabs courseId={params.id} />;
}
