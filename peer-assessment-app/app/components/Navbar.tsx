import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { signOut } from 'next-auth/react';

export default function Navbar() {
  const handleSignOut = async () => {
    await signOut({ callbackUrl: '/' });
  };

  return (
    <Box sx={{ display: 'flex', maxHeight: "100px", bgcolor: "#800020" , marginBottom: 2}}>
        <Toolbar sx={{ width: '100%' }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
            Concordia University
          </Typography>
          <Button sx={{ marginLeft: 'auto', color: 'white' }} onClick={handleSignOut}>

            Sign out
          </Button>
        </Toolbar>
    </Box>
  );
}