"use client";

import { useState, useEffect } from "react";
import {
  Slider,
  Box,
  Typography,
  Button,
  TextField,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  SelectChangeEvent,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import { styled } from "@mui/system";
import grey from "@mui/material/colors/grey";
import { Tooltip } from "@nextui-org/tooltip";
import InfoIcon from "@mui/icons-material/Info";

interface Ratings {
  cooperation: number;
  conceptual: number;
  practical: number;
  workEthic: number;
  overall_score?: number;
  cooperationComment: string;
  conceptualComment: string;
  practicalComment: string;
  workEthicComment: string;
}

interface Teammate {
  s_id: number;
  s_name: string;
  team_id: number;
}

const StyledSlider = styled(Slider)(({ value }) => ({
  color: value === 0 ? grey[400] : "#800020",
  "& .MuiSlider-thumb": {
    backgroundColor: value === 0 ? grey[400] : "#800020",
  },
}));

const formStyle = {
  width: 700,
  mx: "auto",
  padding: "20px",
  borderRadius: "10px",
  boxShadow: "3",
};

const StyledTooltip = styled(Tooltip)({
  color: "#FFFFFF",
  backgroundColor: "#800020",
  padding: "8px 16px",
  boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.25)",
  borderRadius: "12px",
  fontSize: "12px",
  maxWidth: "300px",
  fontFamily: "sans-serif",
});

export default function RatingForm({ courseId }: { courseId: number }) {
  const [selectedTeammate, setSelectedTeammate] = useState<Teammate | string>(
    "",
  ); // Store entire teammate object
  const [teammates, setTeammates] = useState<Teammate[]>([]);
  const [ratings, setRatings] = useState<Ratings>({
    cooperation: 1,
    conceptual: 1,
    practical: 1,
    workEthic: 1,
    cooperationComment: "",
    conceptualComment: "",
    practicalComment: "",
    workEthicComment: "",
  });
  const [openDialog, setOpenDialog] = useState(false); // State to control dialog visibility

  useEffect(() => {
    const fetchTeammates = async () => {
      try {
        const response = await fetch(
          `/api/teams/teammates?courseId=${courseId}`,
        );
        if (!response.ok) {
          throw new Error("Failed to fetch teammates");
        }
        const data = await response.json();
        setTeammates(data);
      } catch (error) {
        console.error("Error fetching teammates:", error);
      }
    };
    fetchTeammates();
  }, [courseId]);

  const handleTeammateChange = (event: SelectChangeEvent<string>) => {
    const selectedId = Number(event.target.value);
    const foundTeammate = teammates.find((t) => t.s_id === selectedId); // Find full teammate object
    setSelectedTeammate(foundTeammate || ""); // Set entire teammate object
  };

  const handleFormChange =
    (name: keyof Ratings) =>
    (
      event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | Event,
      newValue?: number | number[],
    ) => {
      if (name.includes("Comment")) {
        const target = event.target as
          | HTMLInputElement
          | HTMLTextAreaElement
          | null;
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

  // Open confirmation dialog
  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  // Close confirmation dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  // Handle final submission after confirmation
  const handleConfirmSubmit = async () => {
    if (!selectedTeammate) {
      alert("Please select a teammate");
      return;
    }

    try {
      const overallScore =
        (ratings.cooperation +
          ratings.conceptual +
          ratings.practical +
          ratings.workEthic) /
        4;
      const response = await fetch("/api/teams/ratings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: (selectedTeammate as Teammate).s_id,
          teamId: (selectedTeammate as Teammate).team_id,
          ...ratings,
          overallScore: overallScore.toFixed(1),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit ratings");
      }

      const result = await response.json();
      console.log("Server response:", result);
      alert("Ratings submitted successfully!");
    } catch (error) {
      console.error("Error submitting ratings:", error);
      alert("There was an error submitting your ratings. Please try again.");
    }

    handleCloseDialog(); // Close dialog after submission
  };

  return (
    <Box component="form" sx={formStyle}>
      <Typography variant="h6">Rate a teammate:</Typography>

      {/* Select Teammate */}
      <FormControl fullWidth sx={{ mb: 3, mt: 1 }}>
        <InputLabel id="teammate-select-label">Select Teammate</InputLabel>
        <Select
          labelId="teammate-select-label"
          id="teammate-select"
          value={
            selectedTeammate ? String((selectedTeammate as Teammate).s_id) : ""
          }
          onChange={handleTeammateChange}
          label="Select Teammate"
        >
          {teammates.map((teammate) => (
            <MenuItem key={teammate.s_id} value={teammate.s_id}>
              {teammate.s_name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      {/* Rating Sliders and Comments */}
      <div
        style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "50px" }}
      >
        {[
          {
            label: "Cooperation",
            value: "cooperation",
            tooltip:
              "Actively participating in meetings; Communicating with the group; Cooperating with the group; Assisting teammates when needed; Volunteering for tasks;",
          },
          {
            label: "Conceptual Contribution",
            value: "conceptual",
            tooltip:
              "Researching and gathering information; Quality of individual contribution; Suggesting ideas; Tying ideas together; Identifying difficulties; Identifying effective approaches.",
          },
          {
            label: "Practical Contribution",
            value: "practical",
            tooltip:
              "Writing of the report(s); Reviewing others' report(s) or section(s); Providing constructive feedback on the report(s) or the presentation; Contributing to the organization of the work; Contributing to the preparation of presentation(s) (if appropriate).",
          },
          {
            label: "Work Ethic",
            value: "workEthic",
            tooltip:
              "Displaying a positive attitude; Respecting team-mates; Respecting commitments; Respecting deadlines; Respecting team-mates' ideas.",
          },
        ].map((item, index) => (
          <Box sx={{ my: "2" }} key={index}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                paddingBottom: "10px",
                justifyContent: "space-between",
              }}
            >
              <Typography id={`${item.value}-label`}>
                {item.label}: {ratings[item.value as keyof Ratings]}
              </Typography>
              <StyledTooltip
                content={item.tooltip}
                placement="right-start"
                closeDelay={100}
              >
                <InfoIcon fontSize="small" />
              </StyledTooltip>
            </div>
            <StyledSlider
              value={ratings[item.value as keyof Ratings] as number}
              onChange={handleFormChange(item.value as keyof Ratings)}
              aria-labelledby={`${item.value}-label`}
              valueLabelDisplay="auto"
              step={1}
              marks
              min={1}
              max={5}
            />
            <TextField
              label="Comment your choice"
              variant="outlined"
              fullWidth
              multiline
              rows={2}
              value={ratings[`${item.value}Comment` as keyof Ratings] as string}
              onChange={(e) =>
                handleFormChange(`${item.value}Comment` as keyof Ratings)(e)
              }
              sx={{
                mt: "1",
                "& .MuiOutlinedInput-root": {
                  "&.Mui-focused fieldset": {
                    borderColor: "#800020",
                  },
                },
                "& .MuiInputLabel-root.Mui-focused": {
                  color: "#800020",
                },
              }}
            />
          </Box>
        ))}
      </div>

      {/* Submit Button */}
      <Button
        type="button"
        variant="contained"
        sx={{
          backgroundColor: "#800020",
          marginTop: "20px",
          alignSelf: "center",
        }}
        onClick={handleOpenDialog} // Open confirmation dialog on submit click
      >
        Submit
      </Button>

      {/* Confirmation Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        aria-labelledby="confirm-dialog-title"
        aria-describedby="confirm-dialog-description"
      >
        <DialogTitle id="confirm-dialog-title">Confirm Submission</DialogTitle>
        <DialogContent>
          <DialogContentText id="confirm-dialog-description">
            Are you sure you want to submit this evaluation? If you have already
            submitted an evaluation for this student, your previous evaluation
            will be overwritten.
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmSubmit} color="primary" autoFocus>
            Confirm
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
