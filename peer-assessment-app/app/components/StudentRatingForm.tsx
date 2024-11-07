"use client";

import { useState } from 'react';
import { Slider, Box, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import grey from '@mui/material/colors/grey';

interface Ratings {
  cooperation: number;
  conceptual: number;
  practical: number;
  workEthic: number;
}

const StyledSlider = styled(Slider)(({ value }) => ({
    color: value === 0 ? grey[400] : '#800020',
    '& .MuiSlider-thumb': {
      backgroundColor: value === 0 ? grey[400] : '#800020',
    },
  }));

const RatingForm: React.FC = () => {
  // State to track each slider’s value
  const [ratings, setRatings] = useState<Ratings>({
    cooperation: 0,
    conceptual: 0,
    practical: 0,
    workEthic: 0,
  });


  const handleChange = (name: keyof Ratings) => (_: Event, newValue: number | number[]) => {
    setRatings((prevRatings) => ({
      ...prevRatings,
      [name]: newValue as number,
    }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Submitted Ratings:", ratings);

    if (Object.values(ratings).some((rating) => rating === 0)) {
        alert("Ratings cannot be 0. Please rate each category from 1 to 7.");
        return;
    }

    // await addRating() // need to add back end logic
  };

  const formStyle = {
    width: 300,
    mx: 'auto',
    padding: '20px',
    borderRadius: '10px',
    border: '1px solid black'
  };


  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
      <Typography variant="h6">Rate selected teammate:</Typography>
      <Box sx={{ my: 2 }}>
        <Typography id="cooperation-label" gutterBottom>
          Cooperation: {ratings.cooperation}
        </Typography>
        <StyledSlider
          value={ratings.cooperation}
          onChange={handleChange("cooperation")}
          aria-labelledby="cooperation-label"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={7}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography id="conceptual-label" gutterBottom>
          Conceptual Contribution: {ratings.conceptual}
        </Typography>
        <StyledSlider
          value={ratings.conceptual}
          onChange={handleChange("conceptual")}
          aria-labelledby="conceptual-label"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={7}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography id="practical-label" gutterBottom>
          Practical Contribution: {ratings.practical}
        </Typography>
        <StyledSlider
          value={ratings.practical}
          onChange={handleChange("practical")}
          aria-labelledby="practical-label"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={7}
        />
      </Box>

      <Box sx={{ my: 2 }}>
        <Typography id="workEthic-label" gutterBottom>
          Work Ethic: {ratings.workEthic}
        </Typography>
        <StyledSlider
          value={ratings.workEthic}
          onChange={handleChange("workEthic")}
          aria-labelledby="workEthic-label"
          valueLabelDisplay="auto"
          step={1}
          marks
          min={0}
          max={5}
        />
      </Box>

      <Button type="submit" variant="contained" sx={{backgroundColor: '#800020'}}>
        Submit
      </Button>
    </Box>
  );
};

export default RatingForm;
