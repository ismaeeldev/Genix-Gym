import React, { useState, useEffect } from "react";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import { Box, Container, Grid, Avatar, Typography, Paper, Chip, Skeleton } from "@mui/material";
import { styled } from "@mui/system";
import { useLocation } from "react-router-dom"; // Import useLocation hook
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "../../context"; // Adjust path if needed
import { FiUser, FiMail, FiPhone, FiUsers, FiDroplet, FiCalendar, FiMapPin, FiAward } from "react-icons/fi";
import men from '../../assets/images/men.jpg'
import female from '../../assets/images/female.jpg'
// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(3),
    transition: "all 0.3s ease-in-out",
    borderRadius: theme.spacing(2),
    boxShadow: theme.shadows[6],
    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
    },
}));

const MemberProfile = () => {
    const [loading, setLoading] = useState(true);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;
    const [userData, setUserData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        gender: "",
        bloodGroup: "",
        membership_type: "",
        dateOfBirth: "",
        avatar: "",
    });

    // Retrieve user data from navigation state
    const { state } = useLocation();
    const user = state?.user; // Access the passed user data

    useEffect(() => {
        if (user) {
            setUserData(user); // Set user data from state if it exists
        }

        const timer = setTimeout(() => setLoading(false), 1500); // Simulate loading
        return () => clearTimeout(timer);
    }, [user]);

    // Theme configuration
    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: { main: "#2196f3" },
            secondary: { main: "#f50057" },
            background: {
                default: darkMode ? "#1A2035" : "#F0F2F5",
                paper: darkMode ? "#1A2035" : "#F0F2F5",
            },
            text: {
                primary: darkMode ? "#FFFFFF" : "#000000",
                secondary: darkMode ? "#B0B0B0" : "#555555",
            },
        },
        typography: { fontFamily: "'Roboto', sans-serif" },
    });

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ThemeProvider theme={theme}>
                <Box
                    sx={{
                        minHeight: "100vh",
                        bgcolor: "background.default",
                        transition: "background-color 0.3s ease-in-out",
                        py: 4,
                    }}
                >
                    <Container maxWidth="md">
                        <StyledPaper>
                            <Grid container spacing={3}>
                                {/* Avatar Section */}
                                <Grid item xs={12} sm={4} display="flex" justifyContent="center" alignItems="flex-start">
                                    {loading ? (
                                        <Skeleton variant="circular" width={150} height={150} />
                                    ) : (
                                        <Avatar
                                            src={userData.gender === "male" ? men : female}
                                            alt={userData.name}
                                            sx={{ width: 150, height: 150, border: 3, borderColor: "primary.main" }}
                                        />

                                    )}
                                </Grid>

                                {/* User Details Section */}
                                <Grid item xs={12} sm={8}>
                                    {loading ? (
                                        <Box>
                                            <Skeleton width="60%" height={40} />
                                            <Skeleton width="40%" height={30} />
                                            <Skeleton width="70%" height={25} />
                                        </Box>
                                    ) : (
                                        <Box>
                                            <Typography variant="h4" gutterBottom>
                                                {userData.name}
                                            </Typography>

                                            <Box display="flex" alignItems="center" gap={1}>
                                                <FiAward color="#f50057" size={20} />
                                                <Typography variant="h6" color="primary" gutterBottom>
                                                    {userData.membership_type}
                                                </Typography>
                                            </Box>

                                            <Box display="flex" alignItems="center" gap={1}>
                                                <FiMapPin color="#2196f3" size={20} />
                                                <Typography variant="body1" gutterBottom>
                                                    {userData.address}
                                                </Typography>
                                            </Box>
                                        </Box>
                                    )}
                                </Grid>

                                {/* Chips for User Info */}
                                <Grid item xs={12}>
                                    <Box display="flex" flexWrap="wrap" gap={1}>
                                        <Chip icon={<FiMail />} label={`Email: ${userData.email}`} />
                                        <Chip icon={<FiPhone />} label={`Phone: ${userData.phone}`} />
                                        <Chip icon={<FiUsers />} label={`Gender: ${userData.gender}`} />
                                        <Chip icon={<FiDroplet />} label={`Blood Group: ${userData.bloodGroup}`} />
                                        <Chip icon={<FiCalendar />} label={`DOB: ${userData.dateOfBirth}`} />
                                    </Box>
                                </Grid>
                            </Grid>
                        </StyledPaper>
                    </Container>
                </Box>
            </ThemeProvider>
        </DashboardLayout>
    );
};

export default MemberProfile;
