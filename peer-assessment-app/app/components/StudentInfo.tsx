"use client";

import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

interface Ratings {
  cooperation: number;
  conceptual: number;
  practical: number;
  workEthic: number;
  overall: number;
}

interface StudentInfoCardProps {
  studentName: string;
  ratings: Ratings;
  comments: string[];
}

const StudentInfoCard: React.FC<StudentInfoCardProps> = ({ studentName, ratings, comments }) => {
  return (
    <Card sx={{ maxWidth: 400, mx: 'auto', my: 2, p: 2, boxShadow: 3 }}>
      <CardContent>
        <Typography variant="h5" gutterBottom>
          {studentName}&#39;s Ratings
        </Typography>

        <Box sx={{ my: 1 }}>
          <Typography variant="body1">
            <strong>Cooperation:</strong> {ratings.cooperation}
          </Typography>
        </Box>

        <Box sx={{ my: 1 }}>
          <Typography variant="body1">
            <strong>Conceptual Contribution:</strong> {ratings.conceptual}
          </Typography>
        </Box>

        <Box sx={{ my: 1 }}>
          <Typography variant="body1">
            <strong>Practical Contribution:</strong> {ratings.practical}
          </Typography>
        </Box>

        <Box sx={{ my: 1 }}>
          <Typography variant="body1">
            <strong>Work Ethic:</strong> {ratings.workEthic}
          </Typography>
        </Box>

        <Box sx={{ my: 1, color: '#800020' }}>
          <Typography variant="body1">
            <strong>Overall score:</strong> {ratings.overall}
          </Typography>
        </Box>

        <Box sx={{ my: 2 }}>
          <Typography variant="body1">
            <strong>Comments:</strong>
          </Typography>
          {comments.map((comment, index) => (
            <Typography variant="body2" key={index} sx={{ mb: 1 }}>
              -- {comment}
            </Typography>
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default StudentInfoCard;
