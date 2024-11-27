import StudentInfoCard from "../components/StudentInfo";

export default function Home() {
    return (
        <StudentInfoCard
            studentName="John Smith"
            ratings={{
                cooperation: 6,
                conceptual: 3,
                practical: 4,
                workEthic: 3,
                overall: 4.5,
            }}
            comments={["He is good", "He is bad"]}
        />
    );
}
