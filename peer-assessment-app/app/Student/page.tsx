'use client'
import { Box, Typography } from "@mui/material";
import AccountMenu from "../components/AccountMenu";
import CourseCard from "../components/Course";
import Course from "../components/Course";
import LeftSidebar from "../components/LeftSidebar";


export default function Home() {

    return(
        <>
        {/* <AccountMenu/> */}
        <LeftSidebar/>
        <Box sx={{display: "flex", flexWrap: "wrap", marginLeft: "100px", padding: "10px", gap:"7px"}}>
            <Box sx={{width: "100%", marginBottom: "20px"}}>
                <Typography variant="h4">
                    Hi Ms. Joumana!
                </Typography>
                {/* <Divider sx={{bgcolor: "black", border: "1px solid black", width: "400px", margin: ""}}/> */}
            </Box>
            <CourseCard onClick={""}/>
        </Box> 
        </>
    );
}