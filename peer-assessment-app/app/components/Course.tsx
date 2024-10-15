
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Divider } from '@mui/material';
import CourseData from 'app/api/course/route';


const courses = await CourseData();

interface CourseCardProp {
	onClick: () => void;
}

// export default function CourseCard({onClick}: CourseCardProp) {
//   return (
//     <Card sx={{ minWidth: 345 , minHeight: 150, bgcolor: "lightblue" }} >
//       <CardActionArea sx={{bgcolor: "white", minHeight: "140px"}} onClick={onClick} >
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             SOEN 341
//             <Divider sx={{marginBottom: "10px", border: "1px solid", width: "120px"}}/>
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//             Info on the course.
//           </Typography>
//           <Avatar sx={{ bgcolor:"", margin: "5px", float: "right"}}></Avatar>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//   );
// }

// this code is hardcoded

export default function CourseCard() {

  return (
    <> {

      //need to figure out a way to map this promise shit...
      Promise.all(courses.map(async (course: any, idx: any) => {
        <Card key={idx} sx={{ minWidth: 345 , minHeight: 150, bgcolor: "lightblue" }} >
      <CardActionArea sx={{bgcolor: "white", minHeight: "140px"}}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course.name}
            <Divider sx={{marginBottom: "10px", border: "1px solid", width: "120px"}}/>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {course.info}
          </Typography>
          <Avatar sx={{ bgcolor:"", margin: "5px", float: "right"}}></Avatar>
        </CardContent>
      </CardActionArea>
    </Card>
}))}
  </>
  );
}
