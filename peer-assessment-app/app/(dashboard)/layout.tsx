'use client'
import { useEffect, useState } from "react";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import { Session } from "next-auth";
import Navbar from "@/app/components/Navbar";

export default  function DashboardLayout({ children }: { children: React.ReactNode }) {
    const [session, setSession] = useState<Session|null>(null);
    
    useEffect(() => {
        fetch('/api/protected')
        .then((res) => res.json())
        .then((data) => setSession(data))
        .catch((error) => console.error('Error fetching session:', error));
    }, []);
    
 

    return (
        <>
            <Navbar />
            <Box sx={{display: "flex", flexWrap: "wrap",  padding: "10px", gap:"7px"}}>
                <Box sx={{width: "100%", marginBottom: "20px"}}>
                    <Typography variant="h4">
                        Welcome {session?.user?.name}!
                    </Typography>
                    {/* <Divider sx={{bgcolor: "black", border: "1px solid black", width: "400px", margin: ""}}/> */}
                </Box>
                
                {children}

            </Box> 
        </>
    );
}