import { useEffect, useState } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import StudentList from "@/app/components/StudentList";
import RatingForm from "./StudentRatingForm";
import TeamsDrop from "@/app/components/TeamsDrop";
import StudentAttributes from "@/app/components/StudentAttributes";
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
        "aria-controls": `simple-tabpanel-${index}`,
    };
}

export default function StudentTabs({ courseId }: { courseId: number }) {
    const [value, setValue] = useState(0);
    const [teams, setTeams] = useState([]); // Move teams state here
    const [loadingTeams, setLoadingTeams] = useState<boolean>(true); // Loading state for teams

    const handleChange = (_event: React.SyntheticEvent, newValue: number) => {
        setValue(newValue);
    };

    const [students, setStudents] = useState([]);
    const course_id = courseId;

    const fetchStudents = async (course_id: number) => {
        try {
            const response = await fetch(`/api/students?courseId=${course_id}`);
            if (!response.ok) {
                throw new Error("Failed to fetch students");
            }
            const data = await response.json();
            setStudents(data);
        } catch (error) {
            console.error("Error fetching students:", error);
        }
    };

    // Fetch teams for the course
    const fetchTeams = async () => {
        setLoadingTeams(true); // Set loading state
        try {
            const response = await fetch("/api/instructor_teamsView");
            if (!response.ok) {
                throw new Error("Failed to fetch teams");
            }
            const data = await response.json();
            setTeams(data);
        } catch (error) {
            console.error("Error fetching teams:", error);
        } finally {
            setLoadingTeams(false); // Stop loading state
        }
    };

    useEffect(() => {
        fetchStudents(course_id);
        fetchTeams(); // Fetch teams when component mounts
    }, [course_id]);

    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                <Tabs
                    value={value}
                    onChange={handleChange}
                    textColor="inherit"
                    aria-label="secondary tabs example"
                >
                    <Tab label="Student List" {...a11yProps(0)} />
                    <Tab label="Teams" {...a11yProps(1)} />
                    <Tab label="Evaluate Team members" {...a11yProps(2)} />
                    <Tab label="My Profile" {...a11yProps(3)} />
                </Tabs>
            </Box>
            <CustomTabPanel value={value} index={0}>
                <StudentList students={students} course_id={course_id} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={1}>
                <TeamsDrop teams={teams} loading={loadingTeams} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={2}>
                <RatingForm courseId={courseId} />
            </CustomTabPanel>

            <CustomTabPanel value={value} index={3}>
                <StudentAttributes course_id={courseId} />
            </CustomTabPanel>
        </Box>
    );
}
