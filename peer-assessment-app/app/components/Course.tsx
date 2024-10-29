
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Divider } from '@mui/material';

interface CourseCardProp {
	onClick: () => void;
}

export default function CourseCard({onClick}: CourseCardProp) {
  return (
    <Card sx={{ minWidth: 345 , minHeight: 150, bgcolor: "lightblue" }} >
      <CardActionArea sx={{bgcolor: "white", minHeight: "140px"}} onClick={onClick} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            SOEN 341
            <Divider sx={{marginBottom: "10px", border: "1px solid", width: "120px"}}/>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Info on the course.
          </Typography>
          <Avatar sx={{ bgcolor:"", margin: "5px", float: "right"}}></Avatar>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
