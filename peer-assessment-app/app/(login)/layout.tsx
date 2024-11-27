"use client";
import { styled } from "@mui/material/styles";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";

const SignInContainer = styled(Stack)(() => ({
    position: "absolute", // Ensure relative positioning for stacking context
    // padding: 10,
    height: "100%", // Ensure it has height
    width: "100%", // Ensure it has width
    backgroundImage: `url(${"/images/concordia.png"})`, // Set the background image
    backgroundSize: "cover",
    backgroundPosition: "center",
    // Overlay with a white color at 50% opacity
}));

function Navbar() {
    return (
        <Box sx={{ display: "flex", maxHeight: "100px", bgcolor: "#800020" }}>
            <Toolbar sx={{ width: "100%" }}>
                <Typography
                    variant="h6"
                    noWrap
                    component="div"
                    sx={{ color: "white" }}
                >
                    Concordia University
                </Typography>
            </Toolbar>
        </Box>
    );
}

function FormContainer({ children }: { children: React.ReactNode }) {
    return (
        <SignInContainer>
            <Navbar />
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    height: "100%", // Adjust height as needed
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                    gap: 1,
                }}
            >
                {children}
            </Box>
        </SignInContainer>
    );
}
export default function LoginLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <FormContainer>{children}</FormContainer>;
}
