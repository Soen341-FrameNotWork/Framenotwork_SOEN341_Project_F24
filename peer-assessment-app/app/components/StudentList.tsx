import { useState } from "react";
import { DataGrid, GridColDef, GridRowSelectionModel } from "@mui/x-data-grid";
import Paper from "@mui/material/Paper";
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    TextField,
    Typography,
} from "@mui/material";

const columns: GridColDef[] = [
    { field: "firstName", headerName: "First name", width: 130 },
    { field: "lastName", headerName: "Last name", width: 130 },
    { field: "s_id", headerName: "Student ID", width: 130 },
    { field: "email", headerName: "Email", width: 200 },
];

interface Student {
    s_id: number;
    s_name: string | null;
    s_email: string | null;
    s_password: string;
}

interface StudentListProps {
    students: Student[];
    course_id: number | string;
}

export default function StudentList({ students, course_id }: StudentListProps) {
    console.log(students);
    const rows = students.map((student) => {
        const fullname = student.s_name;
        const firstName = fullname ? fullname.split(" ", 1)[0] : "";
        const lastName = fullname ? fullname.split(" ").slice(1).join(" ") : "";
        return {
            id: student.s_id,
            s_id: student.s_id,
            lastName: lastName,
            firstName: firstName,
            email: student.s_email,
            s_name: fullname,
        };
    });

    const [selectedRows, setSelectedRows] = useState<GridRowSelectionModel>([]);
    const [open, setOpen] = useState(false);
    const [teamName, setTeamName] = useState<string>("");

    const handleCreateTeam = () => {
        if (selectedRows.length === 0) {
            alert("Select students");
            return;
        }
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleConfirm = (e: any) => {
        e.preventDefault();

        const selectedStudents = selectedRows.map((id) => {
            // console.log('id: ',id);
            return rows.find((row) => row.s_id === id);
        });

        console.log("selected Students: ", selectedStudents);
        console.log(
            "req body: ",
            JSON.stringify({
                students: selectedStudents,
                course_id: course_id,
                team_name: teamName,
            }),
        ); // Convert the array to JSON)

        fetch("/api/create-team", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                students: selectedStudents,
                course_id: course_id,
                team_name: teamName,
            }), // Convert the array to JSON
        })
            .then((response) => {
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                return response.json();
            })
            .then((data) => {
                console.log("Success:", data);
                setSelectedRows([]);
                alert("Team created successfully!");
            })
            .catch((error) => {
                console.error("Error:", error);
                alert("Failed to create team");
            })
            .finally(() => {
                setOpen(false);
            });
    };

    return (
        <Paper sx={{ height: "100%", width: "100%", padding: "16px" }}>
            <Typography variant="h6" gutterBottom>
                Students
                <Button
                    variant="contained"
                    color="primary"
                    onClick={handleCreateTeam}
                    sx={{ float: "right" }}
                >
                    Create Team
                </Button>
            </Typography>
            <DataGrid
                rows={rows}
                columns={columns}
                pageSizeOptions={[5, 10, 15, 25]}
                checkboxSelection
                onRowSelectionModelChange={(newSelection) =>
                    setSelectedRows(newSelection)
                }
                sx={{ border: 0, height: "400px", width: "100%" }}
            />
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Team Summary</DialogTitle>
                <DialogContent>
                    <Typography>Selected Students:</Typography>
                    <ul>
                        {selectedRows.map((id) => {
                            console.log(id);
                            const student = rows.find((row) => row.s_id === id);
                            return <li key={id}>{student?.s_name}</li>;
                        })}
                    </ul>
                    <TextField
                        autoFocus
                        margin="dense"
                        label="Team Name"
                        type="text"
                        fullWidth
                        variant="outlined"
                        value={teamName}
                        onChange={(e) => setTeamName(e.target.value)}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleConfirm} color="primary">
                        Confirm
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}
