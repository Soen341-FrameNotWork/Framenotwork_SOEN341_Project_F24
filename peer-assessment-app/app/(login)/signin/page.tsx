'use client'
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Checkbox from '@mui/material/Checkbox';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormLabel from '@mui/material/FormLabel';
import FormControl from '@mui/material/FormControl';
import Link from '@mui/material/Link';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import Card from '@mui/material/Card';
import { styled } from '@mui/material/styles';
import Image from 'next/image';
import StudentInstructorToggle from '../student_instructor_toggle';
import { signIn } from 'next-auth/react';
import { useState } from 'react';
import { useRouter } from 'next/navigation'


// const CustomCard = styled(Card)(({ theme }) => ({
//   display: 'flex',
//   flexDirection: 'column',
//   alignSelf: 'center',
//   width: '100%',
//   padding: theme.spacing(4),
//   gap: theme.spacing(2),
//   margin: 'auto',
//   [theme.breakpoints.up('sm')]: {
//     maxWidth: '450px',
//   },
//   boxShadow:
//     'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
//   ...theme.applyStyles('dark', {
//     boxShadow:
//       'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
//   }),
// }));

const CustomCard = styled(Card)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignSelf: 'center',
    width: '100%',
    padding: theme.spacing(4),
    gap: theme.spacing(2),
    margin: 'auto',
    [theme.breakpoints.up('sm')]: {
        maxWidth: '450px',
    },
    boxShadow:
        'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
    ...theme.applyStyles('dark', {
        boxShadow:
            'hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px',
    }),
    bgColor: 'rgba(255, 255, 255, 0.95)',
}));

// const SignInContainer = styled(Stack)(({ theme }) => ({
//   padding: 20,
//   marginTop: '10vh',
//   '&::before': {
//     content: '""',
//     display: 'block',
//     position: 'absolute',
//     zIndex: -1,
//     inset: 0,
//     backgroundImage:
//       'radial-gradient(ellipse at 50% 50%, hsl(210, 100%, 97%), hsl(0, 0%, 100%))',
//     backgroundRepeat: 'no-repeat',
//     ...theme.applyStyles('dark', {
//       backgroundImage:
//         'radial-gradient(at 50% 50%, hsla(210, 100%, 16%, 0.5), hsl(220, 30%, 5%))',
//     }),
//   },
// }));
export function FormContainer({ children }: { children: React.ReactNode }) {

    return (
        <SignInContainer>
            <Box
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '100%', // Adjust height as needed
                    backgroundColor: 'rgba(255, 255, 255, 0.5)',
                    gap: 1,
                }}
            >
                {children}
            </Box>
        </SignInContainer>
    );
}
const SignInContainer = styled(Stack)(() => ({
    position: 'absolute', // Ensure relative positioning for stacking context
    // padding: 10,
    height: '100%', // Ensure it has height
    width: '100%', // Ensure it has width
    backgroundImage: `url(${'/images/concordia.png'})`, // Set the background image
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    // Overlay with a white color at 50% opacity

}));
interface SignInProps {
    onClick: () => void;
}

export default function SignIn({ onClick }: SignInProps) {
    const [emailError, setEmailError] = React.useState(false);
    const [emailErrorMessage, setEmailErrorMessage] = React.useState('');
    const [passwordError, setPasswordError] = React.useState(false);
    const [passwordErrorMessage, setPasswordErrorMessage] = React.useState('');
    const router = useRouter();

    const [userType, setUserType] = useState<'student' | 'instructor'>('student');

    const handleUserTypeChange = (type: 'student' | 'instructor') => {
        setUserType(type);
    };

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        const data = new FormData(event.currentTarget);

        // TODO Remove this later
        // console.log({
        //     email: data.get('email'),
        //     password: data.get('password'),
        //     userType: data.get('userType')
        // });

        // Check database for user here, send a request to the server if the request is successful, redirect to the dashboard

        const result = await signIn('credentials', {
            redirect: false,
            email: data.get('email'),
            password: data.get('password'),
            userType: userType,
        });
        
        if (!result || result.error) {
            console.error('Failed to sign in');
            setPasswordError(true);
            setPasswordErrorMessage('Email or Password is incorrect');
            return;
        } else {
            console.log('Signed in');
            const session = await fetch("/api/auth/session").then((res) => res.json());
            console.log('session: ',session);

            if (session?.user?.id && session?.user?.role) {
                if (session.user.role === "student") {
                  // Redirect student to their dashboard
                  router.push(`/Student`);
                } else if (session.user.role === "instructor") {
                  // Redirect instructor to their dashboard
                  router.push(`/Instructor`);
                }
              }
        }
    }

    const validateInputs = () => {
        const email = document.getElementById('email') as HTMLInputElement;
        const password = document.getElementById('password') as HTMLInputElement;

        let isValid = true;

        if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
            setEmailError(true);
            setEmailErrorMessage('Please enter a valid email address.');
            isValid = false;
        } else {
            setEmailError(false);
            setEmailErrorMessage('');
        }

        if (!password.value || password.value.length < 6) {
            setPasswordError(true);
            setPasswordErrorMessage('Password must be at least 6 characters long.');
            isValid = false;
        } else {
            setPasswordError(false);
            setPasswordErrorMessage('');
        }

        return isValid;
    };


    return (

        <CustomCard variant="outlined" >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Typography
                    component="h1"
                    variant="h4"
                    sx={{ width: '100%', fontSize: 'clamp(2rem, 10vw, 2.15rem)' }}
                >

                    Sign in

                </Typography>
                <Image src='/images/image.png' alt='logo' width={200} height={30} />
            </Box>
            <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    width: '100%',
                    gap: 2,
                }}
            >
                <FormControl>
                    <StudentInstructorToggle onChange={handleUserTypeChange} userType={userType} />
                </FormControl>

                <FormControl>
                    <FormLabel htmlFor="email">Email</FormLabel>
                    <TextField
                        error={emailError}
                        helperText={emailErrorMessage}
                        id="email"
                        type="email"
                        name="email"
                        placeholder="your@email.com"
                        autoComplete="email"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={emailError ? 'error' : 'primary'}
                        sx={{ ariaLabel: 'email' }}
                    />
                </FormControl>
                <FormControl>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <FormLabel htmlFor="password">Password</FormLabel>

                    </Box>
                    <TextField
                        error={passwordError}
                        helperText={passwordErrorMessage}
                        name="password"
                        placeholder="••••••••"
                        type="password"
                        id="password"
                        autoComplete="current-password"
                        autoFocus
                        required
                        fullWidth
                        variant="outlined"
                        color={passwordError ? 'error' : 'primary'}
                    />
                </FormControl>
                <FormControlLabel
                    control={<Checkbox value="remember" color="primary" />}
                    label="Remember me"
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    onClick={validateInputs}
                >
                    Sign in
                </Button>
                <Typography sx={{ textAlign: 'center' }}>
                    Don&apos;t have an account?{' '}
                    <span>
                        <Link
                            component="button"
                            variant="body2"
                            sx={{ alignSelf: 'center' }}
                            onClick={()=> router.push('../signup')}
                        >
                            Sign up
                        </Link>
                    </span>
                </Typography>
            </Box>
        </CustomCard>
    );
}
