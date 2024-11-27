import { useState, useEffect } from "react";
import {
    Box,
    Paper,
    Typography,
    Select,
    MenuItem,
    FormControl,
    InputLabel,
    Checkbox,
    ListItemText,
    IconButton,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import DownloadIcon from "@mui/icons-material/Download";

export default function DetailedView({ courseId }: { courseId: number }) {
    const [teamsData, setTeamsData] = useState([]); // Store all teams data
    const [selectedTeams, setSelectedTeams] = useState<string[]>([]); // Store selected teams
    const [filteredReviewees, setFilteredReviewees] = useState<any>([]); // Store filtered reviewees for selected teams

    // Fetch data once when component mounts
    useEffect(() => {
        const fetchTeamsData = async () => {
            try {
                const response = await fetch(
                    `/api/teams/ratings?courseId=${courseId}`,
                ); // Replace with your API endpoint
                const data = await response.json();
                setTeamsData(data); // Store all teams data
            } catch (error) {
                console.error("Error fetching teams data:", error);
            }
        };

        fetchTeamsData();
    }, [courseId]);

    // Handle team selection change
    const handleTeamChange = (event: any) => {
        const { value } = event.target; // Get selected values from event
        setSelectedTeams(typeof value === "string" ? value.split(",") : value); // Update selected teams state
    };

    // Filter reviewees based on selected teams
    useEffect(() => {
        if (selectedTeams.length > 0) {
            const filteredData = teamsData
                .filter((team) =>
                    selectedTeams.includes((team as any).teamName),
                )
                .flatMap((team) =>
                    (team as any).reviewees.map((reviewee: any) => ({
                        teamName: (team as any).teamName,
                        reviewee,
                    })),
                );
            console.log("filtered data: ", filteredData);
            setFilteredReviewees(filteredData);
        } else {
            setFilteredReviewees([]);
        }
    }, [selectedTeams, teamsData]);

    // Columns for DataGrid (for ratings)
    const columns = [
        { field: "reviewer_name", headerName: "Member", width: 150 },
        { field: "cooperative_score", headerName: "Cooperation", width: 150 },
        { field: "conceptual_score", headerName: "Conceptual", width: 150 },
        { field: "practical_score", headerName: "Practical", width: 150 },
        { field: "work_ethic_score", headerName: "Work Ethic", width: 150 },
        {
            field: "overall_score",
            headerName: "Average Across All",
            width: 200,
        },
    ];

    const handleDownload = () => {
        // Implement download functionality
        console.log("Download button clicked");
        if (filteredReviewees.length === 0) {
            alert("No data to download");
        } else {
            // Download data
            const header =
                "Team Name,Student Name,Reviewer Name,Cooperation,Conceptual,Practical,Work Ethic,Overall,Cooperation Comment,Conceptual Comment,Practical Comment,Work Ethic Comment\n";
            const csv =
                header +
                filteredReviewees
                    .map(({ teamName, reviewee }: any) => {
                        const teamData = reviewee.ratings.map((rating: any) => {
                            return `${teamName},${reviewee.reviewee_name},${rating.reviewer_name},${rating.cooperative_score},${rating.conceptual_score},${rating.practical_score},${rating.work_ethic_score},${rating.overall_score},${rating.comments.cooperative_comment},${rating.comments.conceptual_comment},${rating.comments.practical_comment},${rating.comments.work_ethic_comment}`;
                        });
                        return teamData.join("\n");
                    })
                    .join("\n");
            // console.log('header: ',header);
            // console.log(`csv file: ${csv}`);

            const blob = new Blob([csv], { type: "text/csv" });
            const url = URL.createObjectURL(blob);
            const a = document.createElement("a");
            a.href = url;
            a.download = "teams_detailed_results.csv";
            a.click();
            a.remove();
        }
    };

    return (
        <Box sx={{ paddingTop: "30px", borderColor: "red" }}>
            {/* Dropdown for Team Selection */}
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                    marginBottom: "20px", // Optional margin for spacing
                }}
            >
                <FormControl variant="filled" sx={{ minWidth: "150px" }}>
                    <InputLabel>Select Team</InputLabel>
                    <Select
                        labelId="multiple-checkbox-label"
                        id="multiple-checkbox"
                        multiple
                        value={selectedTeams}
                        onChange={handleTeamChange}
                        renderValue={(selected) => selected.join(", ")} // Display selected team names in input box
                    >
                        {teamsData.map((team) => (
                            <MenuItem
                                key={(team as any).teamName}
                                value={(team as any).teamName}
                            >
                                <Checkbox
                                    checked={selectedTeams.includes(
                                        (team as any).teamName,
                                    )}
                                />
                                <ListItemText
                                    primary={(team as any).teamName}
                                />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <IconButton
                    aria-label="Download results"
                    title={"Download detailed results"}
                    onClick={handleDownload}
                >
                    <DownloadIcon />
                </IconButton>
            </Box>

            {/* Display DataGrid for each reviewee in the selected team */}
            {filteredReviewees.map(({ teamName, reviewee }: any) => (
                <Paper
                    key={reviewee.reviewee_name}
                    sx={{
                        paddingBottom: "20px",
                        marginBottom: "20px",
                        boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
                        borderRadius: "10px",
                        borderColor: "#800020",
                        borderWidth: "4px",
                        borderStyle: "solid",
                        "&:hover": {
                            boxShadow: "0px 0px 10px 5px rgba(0,0,0,0.5)",
                        },
                    }}
                >
                    {/* Box Header with Team Name and Reviewee Name */}
                    <Box sx={{ paddingTop: "10px", paddingLeft: "10px" }}>
                        <Typography variant="h6">
                            Team Name: {teamName}
                        </Typography>
                        <Typography variant="h6">
                            Student Name: {reviewee.reviewee_name}
                        </Typography>
                    </Box>

                    {/* DataGrid for displaying ratings */}
                    <DataGrid
                        sx={{ margin: "10px" }}
                        rows={reviewee.ratings.map(
                            (rating: any, index: number) => ({
                                id: index + 1,
                                reviewer_name: rating.reviewer_name,
                                cooperative_score: rating.cooperative_score,
                                conceptual_score: rating.conceptual_score,
                                practical_score: rating.practical_score,
                                work_ethic_score: rating.work_ethic_score,
                                overall_score: rating.overall_score,
                            }),
                        )}
                        disableRowSelectionOnClick={true}
                        hideFooter={true}
                        columns={columns}
                    />

                    {/* Comments Section */}
                    <Box sx={{ paddingLeft: "10px", marginTop: "10px" }}>
                        <Typography variant="h6">Comments:</Typography>
                        {reviewee.ratings.map((rating: any, index: number) => (
                            <Box key={index} sx={{ marginBottom: "10px" }}>
                                <Typography variant="body1" fontWeight="bold">
                                    {rating.reviewer_name}&apos;s comment:
                                </Typography>

                                {rating.comments.cooperative_comment && (
                                    <Typography variant="body2">
                                        Cooperation Comment -{" "}
                                        {rating.comments.cooperative_comment}
                                    </Typography>
                                )}

                                {rating.comments.conceptual_comment && (
                                    <Typography variant="body2">
                                        Conceptual Comment -{" "}
                                        {rating.comments.conceptual_comment}
                                    </Typography>
                                )}

                                {rating.comments.practical_comment && (
                                    <Typography variant="body2">
                                        Practical Comment -{" "}
                                        {rating.comments.practical_comment}
                                    </Typography>
                                )}

                                {rating.comments.work_ethic_comment && (
                                    <Typography variant="body2">
                                        Work Ethic Comment -{" "}
                                        {rating.comments.work_ethic_comment}
                                    </Typography>
                                )}
                            </Box>
                        ))}
                    </Box>
                </Paper>
            ))}
        </Box>
    );
}
