
import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import CardActionArea from '@mui/material/CardActionArea';
import { Avatar, Divider } from '@mui/material';


interface CourseCardProp {
	onClick: (e?:any) => void,
  row: any|null,
}

export default function CourseCard({onClick, row}:CourseCardProp) {
  // const course_id = row.course_id;
  /**
   * we use the course id for the query that will get the students info for each student in the course.
   */
 

  return (
    <Card sx={{ minWidth: 345 , minHeight: 150, bgcolor: "lightblue" }} >
      <CardActionArea sx={{bgcolor: "white", minHeight: "140px"}} onClick={onClick} >
        <CardContent>
          <Typography gutterBottom variant="h5" component="div">
            {row.c_name}
            <Divider sx={{marginBottom: "5px", border: "1px solid", width: "120px"}}/>
          </Typography>
          <Avatar sx={{margin: "5px", float: "right"}}/>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}

// this code is hardcoded
// const courses = await fetchCourses();
// export default async function CourseCard({onClick, course_name}: CourseCardProp) {

//   courses.forEach((course: any, index: any) => {
//     courseCards.push(

//     );
//   });



// return <>{courseCards}</>;g
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
//   return (
//     <> 
//     {
    
    
//     /* {
//       //need to figure out a way to map this promise shit...
//     //  courses.map((course, index) => (
//         <Card sx={{ minWidth: 345 , minHeight: 150, bgcolor: "lightblue" }} >
//       <CardActionArea sx={{bgcolor: "white", minHeight: "140px"}} onClick={onClick} >
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="div">
//             {course}
//             <Divider sx={{marginBottom: "10px", border: "1px solid", width: "120px"}}/>
//           </Typography>
//           <Typography variant="body2" sx={{ color: 'text.secondary' }}>
//           </Typography>
//           <Avatar sx={{ bgcolor:"", margin: "5px", float: "right"}}></Avatar>
//         </CardContent>
//       </CardActionArea>
//     </Card>
//     // ))
//     } */
    
    
//     }
//       </>
//   );
// }

