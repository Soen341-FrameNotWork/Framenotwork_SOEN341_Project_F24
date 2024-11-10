"use client";

import { useState } from 'react';
import { Slider, Box, Typography, Button, TextField, MenuItem, Select, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';
import { styled } from '@mui/system';
import grey from '@mui/material/colors/grey';
import { Tooltip } from "@nextui-org/tooltip";
import InfoIcon from '@mui/icons-material/Info';

interface Ratings {
  cooperation: number;
  conceptual: number;
  practical: number;
  workEthic: number;
  cooperationComment: string;
  conceptualComment: string;
  practicalComment: string;
  workEthicComment: string;
}

interface RatingFormProps {
  teammates: string[]
}

const StyledSlider = styled(Slider)(({ value }) => ({
  color: value === 0 ? grey[400] : '#800020',
  '& .MuiSlider-thumb': {
    backgroundColor: value === 0 ? grey[400] : '#800020',
  },
}));


const RatingForm: React.FC<RatingFormProps> = ({ teammates }) => {
  const [selectedTeammate, setSelectedTeammate] = useState<string>(
    teammates.length > 0 ? teammates[0] : ''
  );
  const [ratings, setRatings] = useState<Ratings>({
    cooperation: 0,
    conceptual: 0,
    practical: 0,
    workEthic: 0,
    cooperationComment: '',
    conceptualComment: '',
    practicalComment: '',
    workEthicComment: '',
  });

  const handleTeammateChange = (event: SelectChangeEvent<string>) => {
    setSelectedTeammate(event.target.value as string);
  };
  const handleChange = (name: keyof Ratings) => (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Event,
    newValue?: number | number[]
  ) => {
    if (name.includes("Comment")) {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement | null;
      if (target) {
        setRatings((prevRatings) => ({
          ...prevRatings,
          [name]: target.value,
        }));
      }
    } else {
      setRatings((prevRatings) => ({
        ...prevRatings,
        [name]: newValue as number,
      }));
    }
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const concatenatedComments = `${ratings.cooperationComment} ${ratings.conceptualComment} ${ratings.practicalComment} ${ratings.workEthicComment}`.trim();
    console.log("Submitted Ratings:", { selectedTeammate, ...ratings, concatenatedComments });

    if (Object.values(ratings).some((rating) => typeof rating === 'number' && rating === 0)) {
      alert("Ratings cannot be 0. Please rate each category from 1 to 5.");
      return;
    }


    fetch('/api/ratings', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      
    }
    )

    // await addRating() // Add your backend logic here
  };

  const formStyle = {
    width: 700,
    mx: 'auto',
    padding: '20px',
    borderRadius: '10px',
    boxShadow: 3
  };

  const StyledTooltip = styled(Tooltip)({
    color: '#FFFFFF',
    backgroundColor: '#800020',
    padding: '8px 16px',
    boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.25)',
    borderRadius: '12px',
    fontSize: '12px',
    maxWidth: '300px',
    fontFamily: 'sans-serif'
  });

  return (
    <Box component="form" onSubmit={handleSubmit} sx={formStyle}>
      <Typography variant="h6">Rate a teammate:</Typography>
      <FormControl fullWidth
        sx={{
          mb: 3,
          mt: 1,
          '& .MuiOutlinedInput-root': {
            '&.Mui-focused fieldset': {
              borderColor: '#800020',
            },
          },
          '& .MuiInputLabel-root.Mui-focused': {
            color: '#800020',
          },
        }}
      >
        <InputLabel id="teammate-select-label">Select Teammate</InputLabel>
        <Select
          labelId="teammate-select-label"
          id="teammate-select"
          value={selectedTeammate}
          onChange={handleTeammateChange}
          label="Select Teammate"
        >
          {teammates.map((teammate, index) => (
            <MenuItem key={index} value={teammate}>
              {teammate}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '50px'  }}>
      {[
        { label: "Cooperation", value: "cooperation", tooltip: "Actively participating in meetings; Communicating with the group; Cooperating with the group; Assisting teammates when needed; Volunteering for tasks;" },
        { label: "Conceptual Contribution", value: "conceptual", tooltip: "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches." },
        { label: "Practical Contribution", value: "practical", tooltip: "Writing of the report(s); Reviewing others' report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate)." },
        { label: "Work Ethic", value: "workEthic", tooltip: "Displaying a positive attitude; Respecting team-mates; Respecting commitments: Respecting deadlines: Respecting team-mates' ideas" },
      ].map((item, index) => (
        <Box sx={{ my: 2 }} key={index}>
          <div style={{ display: 'flex', alignItems: 'center', paddingBottom: '10px', justifyContent: 'space-between' }}>
            <Typography id={`${item.value}-label`}>
              {item.label}: {ratings[item.value as keyof Ratings]}
            </Typography>
            <StyledTooltip 
              content={item.tooltip} 
              placement="right-start"
              closeDelay={100}
            >
              <InfoIcon fontSize="small"/> 
            </StyledTooltip>
          </div>
          <StyledSlider
            value={ratings[item.value as keyof Ratings] as number} // Explicitly cast to number
            onChange={handleChange(item.value as keyof Ratings)}
            aria-labelledby={`${item.value}-label`}
            valueLabelDisplay="auto"
            step={1}
            marks
            min={0}
            max={5}
          />
          <TextField
            label="Comment your choice"
            variant="outlined"
            fullWidth
            multiline
            rows={2}
            value={ratings[`${item.value}Comment` as keyof Ratings] as string}
            onChange={(e) => handleChange(`${item.value}Comment` as keyof Ratings)(e)}
            sx={{
              mt: 1,
              '& .MuiOutlinedInput-root': {
                '&.Mui-focused fieldset': {
                  borderColor: '#800020',
                },
              },
              '& .MuiInputLabel-root.Mui-focused': {
                color: '#800020',
              },
            }}
          />
        </Box>
      ))}
      </div>
      <Button type="submit" variant="contained" sx={{ backgroundColor: '#800020' }}>
        Submit
      </Button>
    </Box>
  );
};

export default RatingForm;

