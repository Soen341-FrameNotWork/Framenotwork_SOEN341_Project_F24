import { useState, useEffect } from "react";
import { Box, Typography, IconButton } from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import FileDownloadIcon from "@mui/icons-material/FileDownload";

// Define types for student data and columns
interface StudentData {
    student_id: number;
    student_name: string;
    team_name: string;
    avg_conceptual_score: number;
    avg_cooperative_score: number;
    avg_practical_score: number;
    avg_work_ethic_score: number;
    count_of_reviews: number;
}

interface ColumnData {
    label: string;
    dataKey: keyof StudentData;
}

// Define columns for the DataGrid
const columns = [
    { field: "student_id", headerName: "Student ID", width: 150 },
    { field: "student_name", headerName: "Student Name", width: 200 },
    { field: "team_name", headerName: "Team Name", width: 150 },
    {
        field: "avg_conceptual_score",
        headerName: "Avg Conceptual Score",
        width: 180,
    },
    {
        field: "avg_cooperative_score",
        headerName: "Avg Cooperative Score",
        width: 180,
    },
    {
        field: "avg_practical_score",
        headerName: "Avg Practical Score",
        width: 180,
    },
    {
        field: "avg_work_ethic_score",
        headerName: "Avg Work Ethic Score",
        width: 180,
    },
    {
        field: "count_of_reviews",
        headerName: "Peers who responded",
        width: 150,
    },
];

// CSV generation logic
const summaryCSV = (
    columnsData: ColumnData[],
    rowsData: StudentData[],
): string => {
    const header = columnsData.map((col) => col.label).join(",");
    const rowData = rowsData.map((row) =>
        columnsData.map((col) => row[col.dataKey]).join(","),
    );
    return [header, ...rowData].join("\n");
};

// Main component
export default function StudentTable({ course_id }: { course_id: number }) {
    const [students, setStudents] = useState<StudentData[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    // Fetch data from API
    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(
                    `/api/summary_result?courseId=${course_id}`,
                );
                const result = await response.json();

                if (response.ok) {
                    setStudents(result.data); // Set students data
                } else {
                    throw new Error(result.error || "Failed to fetch students");
                }
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchData();
    }, [course_id]);

    // Handle CSV download using the provided logic
    const handleResDl = () => {
        const csvContent = summaryCSV(columns as any[], students);
        const blob = new Blob([csvContent], {
            type: "text/csv;charset=utf-8;",
        });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.setAttribute("href", url);
        link.setAttribute("download", "results-summary.csv");
        link.click();
        URL.revokeObjectURL(url);
    };

    // Render loading state
    if (loading) {
        return <p>Loading...</p>;
    }

    // Render error state
    if (error) {
        return <p>Error: {error}</p>;
    }
    console.log(students);

    // Transform students data into rows for DataGrid
    const rows = students.map((student) => ({
        id: student.student_id,
        student_id: student.student_id,
        student_name: student.student_name,
        team_name: student.team_name,
        avg_conceptual_score:
            typeof student.avg_conceptual_score === "string"
                ? parseFloat(student.avg_conceptual_score).toFixed(1)
                : student.avg_conceptual_score,
        avg_cooperative_score:
            typeof student.avg_cooperative_score === "string"
                ? parseFloat(student.avg_cooperative_score).toFixed(1)
                : student.avg_cooperative_score,
        avg_practical_score:
            typeof student.avg_practical_score === "string"
                ? parseFloat(student.avg_practical_score).toFixed(1)
                : student.avg_practical_score,
        avg_work_ethic_score:
            typeof student.avg_work_ethic_score === "string"
                ? parseFloat(student.avg_work_ethic_score).toFixed(1)
                : student.avg_work_ethic_score,
        count_of_reviews: student.count_of_reviews,
    }));

    return (
        <Box sx={{ marginTop: "30px" }}>
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                }}
            >
                <Typography variant="h4" gutterBottom>
                    Student Reviews
                </Typography>
                <IconButton
                    aria-label="Download results"
                    title={"Download detailed results"}
                    onClick={handleResDl}
                >
                    <FileDownloadIcon />
                </IconButton>
            </Box>

            {/* Material UI DataGrid */}
            <DataGrid
                rows={rows}
                columns={columns.map((column) => ({ ...column, flex: 1 }))}
                disableRowSelectionOnClick={true}
                autoHeight={true}
                hideFooter={true}
            />
        </Box>
    );
}
