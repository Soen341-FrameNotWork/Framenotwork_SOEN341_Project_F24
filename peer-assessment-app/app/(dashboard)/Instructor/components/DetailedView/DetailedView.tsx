import { useState, useEffect } from 'react';
import { Box, Paper, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';

export default function DetailedView({courseId}: {courseId: number}) {
  const [teamsData, setTeamsData] = useState([]); // Store all teams data
  const [selectedTeam, setSelectedTeam] = useState(''); // Selected team
  const [filteredReviewees, setFilteredReviewees] = useState([]); // Store filtered reviewees for selected team

  // Fetch data once when component mounts
  useEffect(() => {
    const fetchTeamsData = async () => {
      try {
        const response = await fetch(`/api/team/ratings?courseId=${courseId}`); // Replace with your API endpoint
        const data = await response.json();
        setTeamsData(data); // Store all teams data
      } catch (error) {
        console.error('Error fetching teams data:', error);
      }
    };

    fetchTeamsData();
  }, [courseId]);

  // Handle team selection change
  const handleTeamChange = (event: any) => {
    const selectedTeamName = event.target.value;
    setSelectedTeam(selectedTeamName);

    // Filter reviewees based on selected team
    const selectedTeamData = teamsData.find((team) => (team as any).teamName === selectedTeamName);
    if (selectedTeamData) {
      setFilteredReviewees((selectedTeamData as any).reviewees);
    }
  };

  // Columns for DataGrid (for ratings)
  const columns = [
    { field: 'reviewer_name', headerName: 'Member', width: 150 },
    { field: 'cooperative_score', headerName: 'Cooperation', width: 150 },
    { field: 'conceptual_score', headerName: 'Conceptual', width: 150 },
    { field: 'practical_score', headerName: 'Practical', width: 150 },
    { field: 'work_ethic_score', headerName: 'Work Ethic', width: 150 },
    { field: 'overall_score', headerName: 'Average Across All', width: 200 }
  ];

  return (
    <Box sx={{ paddingTop: '30px', borderColor:'red' }}>
      {/* Dropdown for Team Selection */}
      <FormControl variant="filled" sx={{ minWidth:'150px', marginBottom: '20px' }}>
        <InputLabel>Select Team</InputLabel>
        <Select value={selectedTeam} onChange={handleTeamChange}>
          {teamsData.map((team) => (
            <MenuItem key={(team as any).teamName} value={(team as any).teamName}>
              {(team as any).teamName}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Display DataGrid for each reviewee in the selected team */}
      {filteredReviewees.map((reviewee) => (
        <Paper key={(reviewee as any).reviewee_name} sx={{ 
            paddingBottom: '20px', 
            marginBottom: '20px',
            boxShadow: '0px 4px 10px rgba(0,0,0,0.2)', // Adding shadow for better distinction
            borderRadius: '10px', // Rounded corners
            borderColor: "#800020",
            borderWidth: '4px',
            borderStyle: 'solid',
            '&:hover': {
              boxShadow: '0px 0px 10px 5px rgba(0,0,0,0.5)', // Increase shadow on hover
            }
          }}>
          {/* Box Header with Team Name and Reviewee Name */}
          <Box sx={{ paddingTop: '10px', paddingLeft: '10px' }}>
            <Typography variant="h6">Team Name: {selectedTeam}</Typography>
            <Typography variant="h6">Student Name: {(reviewee as any).reviewee_name}</Typography>
          </Box>

          {/* DataGrid for displaying ratings */}
          <DataGrid
              sx={{ margin: '10px'}}
              rows={(reviewee as any).ratings.map((rating:any, index:number) => ({
                id: index + 1,
                reviewer_name: rating.reviewer_name,
                cooperative_score: rating.cooperative_score,
                conceptual_score: rating.conceptual_score,
                practical_score: rating.practical_score,
                work_ethic_score: rating.work_ethic_score,
                overall_score: rating.overall_score,
              }))}
              disableRowSelectionOnClick={true}
              columns={columns}
            />

          {/* Comments Section */}
          <Box sx={{ paddingLeft: '10px', marginTop: '10px' }}>
            <Typography variant="h6">Comments:</Typography>
            {(reviewee as any).ratings.map((rating:any, index:number) => (
              <Box key={index} sx={{ marginBottom: '10px' }}>
                <Typography variant="body1" fontWeight="bold">
                  {rating.reviewer_name}&apos;s comment:
                </Typography>

                {rating.comments.cooperative_comment &&
                    <Typography variant="body2">
                        Cooperation Comment - {rating.comments.cooperative_comment}
                    </Typography>
                }
                
                {rating.comments.conceptual_comment &&
                    <Typography variant="body2">
                        Conceptual Comment - {rating.comments.conceptual_comment}
                    </Typography>
                }
                {rating.comments.practical_comment &&
                    <Typography variant="body2">
                        Practical Comment - {rating.comments.practical_comment}
                    </Typography>
                }
                {rating.comments.work_ethic_comment &&
                    <Typography variant="body2">
                        Work Ethic Comment - {rating.comments.work_ethic_comment}
                    </Typography>
                }
              </Box>
            ))}
          </Box>
        </Paper>
      ))}
    </Box>
  );
}
