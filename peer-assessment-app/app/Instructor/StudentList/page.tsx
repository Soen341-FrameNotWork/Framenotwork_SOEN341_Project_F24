'use client'

import AccountMenu from "@/app/components/AccountMenu";
import LeftSidebar from "@/app/components/LeftSidebar";
import StudentList from "@/app/components/StudentList";
import { Box, Typography } from "@mui/material";

export default function Home() {

    return (
        <>
            <LeftSidebar />
            <Typography variant="h4" sx={{width: "100%", textAlign: "center"}}>Soen 341 - Student List</Typography>
            <Box sx={{border: "1px", margin: "20px", boxShadow: "1px 1px 5px 5px #800020", borderRadius: "0.5em"}}>
                <StudentList />
            </Box>
        </>
    );
}

