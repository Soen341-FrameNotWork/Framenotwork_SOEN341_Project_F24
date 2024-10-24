
import * as React from 'react';
import {useEffect, useState} from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Divider } from '@mui/material';
import {courses} from 'app/api/course/route';
import getDBData from 'app/api/course/route';



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
//           </Typography>s
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

export default async function CourseCard({onClick}: CourseCardProp) {
const courses: any = await getDBData();
 const courseCards: React.JSX.Element[] = [];
 courses.forEach((course: any, index: any) => {
  courseCards.push(
    <Card key={index} sx={{ minWidth: 345, minHeight: 150, bgcolor: "lightblue" }}>
      <CardActionArea sx={{ bgcolor: "white", minHeight: "140px" }} onClick={onClick}>
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {course}
            <Divider sx={{ marginBottom: "10px", border: "1px solid", width: "120px" }} />
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {/* Course Description */}
          </Typography>
          <Avatar sx={{ margin: "5px", float: "right" }}></Avatar>
        </CardContent>
      </CardActionArea>
    </Card>
  );
});
return <>{courseCards}</>;
//   const [data,setData] = useState<any>(null);
//   const fetchData = () => {
//     const courses = CourseData();
//     setData(courses);
//   // Fetching Data on Initial Load
//   }
  

// useEffect(() => {
//   // Fetching Data on Initial Load
//   fetchData()
// },[])

// console.log(data)
  return (
    <> 
    {
    
    
    /* {
      //need to figure out a way to map this promise shit...
    //  courses.map((course, index) => (
        <Card sx={{ minWidth: 345 , minHeight: 150, bgcolor: "lightblue" }} >
      <CardActionArea sx={{bgcolor: "white", minHeight: "140px"}} onClick={onClick} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {}
            <Divider sx={{marginBottom: "10px", border: "1px solid", width: "120px"}}/>
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          </Typography>
          <Avatar sx={{ bgcolor:"", margin: "5px", float: "right"}}></Avatar>
        </CardContent>
      </CardActionArea>
    </Card>
    // ))
    } */
    
    
    }
      </>
  );
}

