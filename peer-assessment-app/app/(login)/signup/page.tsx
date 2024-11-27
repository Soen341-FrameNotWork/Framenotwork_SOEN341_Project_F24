"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import FormLabel from "@mui/material/FormLabel";
import FormControl from "@mui/material/FormControl";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import MuiCard from "@mui/material/Card";
import { styled } from "@mui/material/styles";
import Image from "next/image";
import StudentInstructorToggle from "../student_instructor_toggle";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";

const Card = styled(MuiCard)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignSelf: "center",
  width: "100%",
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: "auto",
  boxShadow:
    "hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px",
  [theme.breakpoints.up("sm")]: {
    width: "450px",
  },
  ...theme.applyStyles("dark", {
    boxShadow:
      "hsla(220, 30%, 5%, 0.5) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.08) 0px 15px 35px -5px",
  }),
}));

export default function SignUp() {
  const [emailError, setEmailError] = React.useState(false);
  const [emailErrorMessage, setEmailErrorMessage] = React.useState("");
  const [passwordError, setPasswordError] = React.useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = React.useState("");
  const [nameError, setNameError] = React.useState(false);
  const [nameErrorMessage, setNameErrorMessage] = React.useState("");
  const [registrationError, setRegistrationError] = React.useState("");
  const [userType, setUserType] = useState<"student" | "instructor">("student");
  const router = useRouter();

  const onClick = () => {
    router.push("../signin");
  };

  const validateInputs = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    const password = document.getElementById("password") as HTMLInputElement;
    const name = document.getElementById("lastName") as HTMLInputElement;

    let isValid = true;

    if (!email.value || !/\S+@\S+\.\S+/.test(email.value)) {
      setEmailError(true);
      setEmailErrorMessage("Please enter a valid email address.");
      isValid = false;
    } else {
      setEmailError(false);
      setEmailErrorMessage("");
    }

    if (!password.value || password.value.length < 6) {
      setPasswordError(true);
      setPasswordErrorMessage("Password must be at least 6 characters long.");
      isValid = false;
    } else {
      setPasswordError(false);
      setPasswordErrorMessage("");
    }

    if (!name.value || name.value.length < 1) {
      setNameError(true);
      setNameErrorMessage("Name is required.");
      isValid = false;
    } else {
      setNameError(false);
      setNameErrorMessage("");
    }

    return isValid;
  };

  const handleUserTypeChange = (type: "student" | "instructor") => {
    setUserType(type);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const data = new FormData(event.currentTarget);
    const formData = {
      fullName: data.get("fullName"),
      email: data.get("email"),
      password: data.get("password"),
      userType: userType,
    };

    try {
      const response = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      // TODO move this to a separate function that both sign in and sign up can use
      if (response.ok) {
        const result = await signIn("credentials", {
          redirect: false,
          email: data.get("email"),
          password: data.get("password"),
          userType: userType,
        });

        if (!result || result.error) {
          console.error("Failed to sign in");
          return;
        } else {
          console.log("Signed in");
          if (data.get("userType") === "student") {
            router.push("/Student");
          } else if (data.get("userType") === "instructor") {
            router.push("/Instructor");
          }
        }
      } else {
        // Handle registration errors (e.g., user already exists)
        setRegistrationError(result.error || "Registration failed.");
      }
    } catch (error) {
      console.error("Network error:", error);
      setRegistrationError("An unexpected error occurred.");
    }
  };

  return (
    <Stack
      sx={{
        justifyContent: "center",
        height: "100dvh",
        p: 2,
      }}
    >
      <Card variant="outlined">
        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
          <Typography
            component="h1"
            variant="h4"
            sx={{ width: "100%", fontSize: "clamp(2rem, 10vw, 2.15rem)" }}
          >
            Sign up
          </Typography>
          <Image src="/images/image.png" alt="logo" width={200} height={30} />
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          <FormControl>
            <StudentInstructorToggle
              onChange={handleUserTypeChange}
              userType={userType}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="name">Full name</FormLabel>
            <TextField
              autoComplete="fullName"
              name="fullName"
              required
              fullWidth
              id="fullName"
              placeholder="John Smith"
              error={nameError}
              helperText={nameErrorMessage}
              color={nameError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="email">Email</FormLabel>
            <TextField
              required
              fullWidth
              id="email"
              placeholder="your@email.com"
              name="email"
              autoComplete="email"
              variant="outlined"
              error={emailError}
              helperText={emailErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          <FormControl>
            <FormLabel htmlFor="password">Password</FormLabel>
            <TextField
              required
              fullWidth
              name="password"
              placeholder="••••••"
              type="password"
              id="password"
              autoComplete="new-password"
              variant="outlined"
              error={passwordError}
              helperText={passwordErrorMessage}
              color={passwordError ? "error" : "primary"}
            />
          </FormControl>
          {registrationError && (
            <Typography color="error" sx={{ textAlign: "center" }}>
              {registrationError}
            </Typography>
          )}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            onClick={validateInputs}
          >
            Sign up
          </Button>
          <Typography sx={{ textAlign: "center" }}>
            Already have an account?{" "}
            <span>
              <Link
                component="button"
                variant="body2"
                sx={{ alignSelf: "center" }}
                onClick={onClick}
              >
                Sign in
              </Link>
            </span>
          </Typography>
        </Box>
      </Card>
    </Stack>
  );
}
