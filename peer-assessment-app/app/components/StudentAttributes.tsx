"use client";
import React, { useState, useEffect } from 'react';
import Rating from '@mui/material/Rating';
import { Box, Typography } from '@mui/material';
import { Radar } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  RadialLinearScale,
  PointElement,
  LineElement,
  Filler,
  Tooltip,
  Legend
} from 'chart.js';

// Register necessary components for Radar Chart
ChartJS.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);

export default function StudentAttributes({ course_id }: { course_id: number }) {
  const [scores, setScores] = useState({
    cooperative: 0,
    conceptual: 0,
    practical: 0,
    workEthic: 0,
    overall: 0,
  });

  // Fetch student scores on component mount
  useEffect(() => {
    fetch('/api/students/rating?courseId=' + course_id)
      .then(response => response.json())
      .then(({ data }) => {
        const {
          cooperative_score: cooperative,
          conceptual_score: conceptual,
          practical_score: practical,
          work_ethic_score: workEthic,
          overall_score: overall,
        } = data.scores;

        // Update state with fetched scores
        setScores({ cooperative, conceptual, practical, workEthic, overall });
      })
      .catch((error) => {
        console.error('Error fetching student scores:', error);
      });
  }, [course_id]);

  // Radar chart data
  const radarData = {
    labels: ['Cooperative', 'Conceptual', 'Practical', 'Work Ethic', 'Overall'],
    datasets: [
      {
        label: 'Scores',
        data: [
          scores.cooperative,
          scores.conceptual,
          scores.practical,
          scores.workEthic,
          scores.overall
        ],
        backgroundColor: 'rgba(255,99,132,0.2)', // Light red fill color
        borderColor: 'rgba(255,0,0,1)', // Red line color
        borderWidth: 2,
        pointBackgroundColor: 'rgba(255,0,0,1)', // Red point color
      },
    ],
  };

  const radarOptions = {
    scales: {
      r: {
        beginAtZero: true,
        min: 0,
        max: 5,
        ticks: {
          stepSize: 1
        },
        pointLabels: { // Increase font size of category labels around the chart
          font: {
            size: 16 // Adjust this value to make it bigger or smaller
          }
        }
      },
    },
    plugins: {
      legend: { // Increase font size of legend labels
        labels: {
          font: {
            size: 18 // Adjust this value to make it bigger or smaller
          }
        }
      }
    },
    maintainAspectRatio: false // Disable aspect ratio to allow custom sizing
  };

  return (
    <Box display="flex" flexDirection="column" gap={2} justifyContent="center">
      <Typography variant="h4"  align="center">My Ratings</Typography>

      {/* Parent container with border and box shadow */}
       <Box 
            display="flex" 
            flexDirection="row" 
            justifyContent="center" 
            alignItems="center" 
            gap={4}
            sx={{
                borderRadius: '8px',
                boxShadow: '0px 4px 12px rgba(0,0,0,0.1)',
                padding: '20px',
                borderWidth: '1px',
                borderStyle: 'solid',
                borderColor: '#ddd',
                backgroundColor: '#fff',
                width: '80%',
                marginLeft: 'auto',
                marginRight: 'auto'
            }}
        >
        
            {/* Ratings Section (Left) */}
            <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2}>
            <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ width: '150px' }}>Cooperative:</Typography>
                <Rating value={scores.cooperative} precision={0.1} readOnly />
                <Typography variant="body1" sx={{ width: '150px' }}>{scores.cooperative}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ width: '150px' }}>Conceptual:</Typography>
                <Rating value={scores.conceptual} precision={0.1} readOnly />
                <Typography variant="body1" sx={{ width: '150px' }}>{scores.conceptual}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ width: '150px' }}>Practical:</Typography>
                <Rating value={scores.practical} precision={0.1} readOnly />
                <Typography variant="body1" sx={{ width: '150px' }}>{scores.practical}</Typography>
            </Box>

            <Box display="flex" alignItems="center">
                <Typography variant="body1" sx={{ width: '150px' }}>Work Ethic:</Typography>
                <Rating value={scores.workEthic} precision={0.1} readOnly />
                <Typography variant="body1" sx={{ width: '150px' }}>{scores.workEthic}</Typography>
            </Box>

            {/* Display Overall Score */}
            <Box display="flex" alignItems="center">
                <Typography variant="h6" sx={{ width: '150px' }}>Overall rating:</Typography>
                <Rating value={scores.overall} precision={0.1} readOnly size="large" />
                <Typography variant="h6" sx={{ width: '150px' }}>{scores.overall}</Typography>
            </Box>
            </Box>

            {/* Radar Chart Section (Right) */}
            <Box height={400} width={400}>
            <Radar data={radarData} options={radarOptions} />
            </Box>

        </Box>
    </Box>
  );
}