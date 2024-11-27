"use client";
import { Typography } from "@mui/material";
import Box from "@mui/material/Box";
import {useRouter} from 'next/navigation';
import Toolbar from "@mui/material/Toolbar";
import Button from "@mui/material/Button";
import { styled } from '@mui/material/styles';
import Stack from '@mui/material/Stack';

const Background = styled(Stack)(() => ({
  position: 'absolute',
  height: '100%',
  width: '100%',
  backgroundImage: `url(${'/images/concordia.png'})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
}));
function Navbar() {
  const router = useRouter();
  const handleSignIn = async () => {
      router.push('/signin');
  };
  return (
    <Box sx={{ display: 'flex', maxHeight: "100px", bgcolor: "#800020" }}>
        <Toolbar sx={{ width: '100%' }}>
          <Typography variant="h6" noWrap component="div" sx={{ color: "white" }}>
            Concordia University
          </Typography>
          <Button sx={{ marginLeft: 'auto', color: 'white' }} onClick={handleSignIn}>
            Login
          </Button>
        </Toolbar>
    </Box>
  );
}

export default function Home() {

  return (
      <Background>
        <Navbar/>
          <Box
              sx={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  height: '100%',
                  backgroundColor: 'rgba(255, 255, 255, 0.5)',
                  gap: 1,
              }}
          />
      </Background>
  );
}
