import React, { useEffect, useState } from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom"; // Import navigate for redirection
import Cookies from "js-cookie";
import bg from '../../assets/images/new1.jpg'

const LoadingContainer = styled(Box)(({ theme }) => ({
    width: "100vw",
    height: "100vh",
    position: "absolute", // Absolute positioning to cover entire screen
    top: 0,
    left: 0,
    background: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${bg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
    margin: 0,
    padding: 0,
}));

const LoadingContent = styled(Box)(({ theme }) => ({
    textAlign: "center",
    zIndex: 1,
    padding: theme.spacing(3),
    backgroundColor: "rgba(255, 255, 255, 0.1)",
    borderRadius: theme.spacing(2),
    backdropFilter: "blur(10px)",
}));

const LoadingScreen = () => {
    const [progress, setProgress] = useState(0);
    const navigate = useNavigate(); // Hook to navigate programmatically
    const jwtToken = Cookies.get("jwtToken");

    useEffect(() => {
        // Lock scrolling
        const lockScroll = () => {
            document.body.style.overflow = 'hidden';
            document.documentElement.style.overflow = 'hidden';
        };

        // Unlock scrolling
        const unlockScroll = () => {
            document.body.style.overflow = 'auto';
            document.documentElement.style.overflow = 'auto';
        };

        lockScroll();

        const progressUpdateInterval = 500; // Interval in milliseconds
        const totalDuration = 5000; // Total duration for navigation (5 seconds)
        const progressIncrement = 100 / (totalDuration / progressUpdateInterval); // Increment per interval

        const timer = setInterval(() => {
            setProgress((prevProgress) => {
                const newProgress = prevProgress + progressIncrement;

                // Stop the progress bar at 70%
                if (newProgress >= 70) {
                    clearInterval(timer); // Stop the interval when 70% is reached
                    return 70; // Fix the progress to 70%
                }
                return newProgress;
            });
        }, progressUpdateInterval);

        // Navigation logic after 5 seconds
        const navigationTimer = setTimeout(() => {
            if (jwtToken) {
                navigate("/dashboard", { replace: true });
            } else {
                navigate("/authentication/sign-in", { replace: true });
            }
        }, totalDuration);

        // Cleanup when the component unmounts
        return () => {
            clearInterval(timer);
            clearTimeout(navigationTimer);
            unlockScroll(); // Enable scrolling again
        };
    }, [jwtToken, navigate]);



    return (
        <LoadingContainer>
            <LoadingContent>
                <CircularProgress
                    variant="determinate"
                    value={progress}
                    size={80}
                    thickness={4}
                    sx={{ color: "#fff" }}
                />
                <Typography
                    variant="h5"
                    sx={{ mt: 2, color: "#fff", fontWeight: "500" }}
                >
                    Loading Dashboard
                </Typography>
                <Typography
                    variant="body1"
                    sx={{ mt: 1, color: "rgba(255, 255, 255, 0.8)" }}
                >
                    Please wait while we prepare your experience
                </Typography>
            </LoadingContent>
        </LoadingContainer>
    );
};

export default LoadingScreen;
