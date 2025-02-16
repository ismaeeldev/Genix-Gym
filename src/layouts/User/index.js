import React, { useState } from "react";
import {
    Box,
    Container,
    TextField,
    Button,
    Typography,
    IconButton,
    Grid,
    Avatar,
    Paper,
    InputAdornment,
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Tooltip,
} from "@mui/material";
import { FiMail, FiUser, FiLock, FiEye, FiEyeOff } from "react-icons/fi";
import { BiUserCircle } from "react-icons/bi";
import { LuBicepsFlexed } from "react-icons/lu";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useMaterialUIController } from "../../context";
import men from "../../assets/images/men.jpg";
import { styled, createTheme, ThemeProvider } from "@mui/material/styles";
// Styled Components
const StyledPaper = styled(Paper)(({ theme }) => ({
    padding: theme.spacing(4),
    marginTop: theme.spacing(4),
    backgroundColor: theme.palette.mode === "dark" ? "#181e34" : "#fff",
    transition: "all 0.3s ease-in-out",
    borderRadius: "32px",
    boxShadow: theme.shadows[6],

    [theme.breakpoints.down("sm")]: {
        padding: theme.spacing(2),
        marginTop: theme.spacing(2),
    },
}));

const StyledAvatar = styled(Avatar)({
    width: 96,
    height: 96,
    marginBottom: 16,
    cursor: "pointer",
    transition: "transform 0.2s",
    "&:hover": {
        transform: "scale(1.05)",
    },
});

// Main Component
const UserProfile = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [openDialog, setOpenDialog] = useState(false);
    const [controller] = useMaterialUIController();
    const { darkMode } = controller;

    const [formData, setFormData] = useState({
        fullName: "Muhammad Ismaeel",
        email: "ismaeel@gmail.com",
        username: "ismaeeldev",
        gymName: "Genix Gym",
        password: "ismaeeldev786",
        confirmPassword: "ismaeeldev786",
    });

    const theme = createTheme({
        palette: {
            mode: darkMode ? "dark" : "light",
            primary: { main: "#2196f3" },
            secondary: { main: "#f50057" },
        },
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        // Simulate an API call
        await new Promise((resolve) => setTimeout(resolve, 2000));
        setLoading(false);
    };

    return (
        <DashboardLayout>
            <DashboardNavbar />
            <ThemeProvider theme={theme}>
                <Container maxWidth="md">
                    <StyledPaper elevation={3}>
                        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
                            <Box display="flex" flexDirection="column" alignItems="center">
                                <Tooltip title="Change profile picture">
                                    <StyledAvatar src={men} alt="Profile" />
                                </Tooltip>
                                <Typography variant="h4" gutterBottom>
                                    Update Profile
                                </Typography>
                            </Box>

                            <Grid container spacing={3}>
                                {[
                                    { label: "Full Name", name: "fullName", icon: <FiUser /> },
                                    { label: "Email", name: "email", type: "email", icon: <FiMail /> },
                                    { label: "Username", name: "username", icon: <BiUserCircle /> },
                                    { label: "Gym Name", name: "gymName", icon: <LuBicepsFlexed /> },
                                ].map(({ label, name, type = "text", icon }) => (
                                    <Grid item xs={12} md={6} key={name}>
                                        <TextField
                                            fullWidth
                                            label={label}
                                            name={name}
                                            type={type}
                                            value={formData[name]}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                startAdornment: <InputAdornment position="start">{icon}</InputAdornment>,
                                            }}
                                        />
                                    </Grid>
                                ))}

                                {["password", "confirmPassword"].map((field) => (
                                    <Grid item xs={12} md={6} key={field}>
                                        <TextField
                                            fullWidth
                                            label={field === "password" ? "Password" : "Confirm Password"}
                                            name={field}
                                            type={
                                                field === "password"
                                                    ? showPassword
                                                        ? "text"
                                                        : "password"
                                                    : showConfirmPassword
                                                        ? "text"
                                                        : "password"
                                            }
                                            value={formData[field]}
                                            onChange={handleInputChange}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <FiLock />
                                                    </InputAdornment>
                                                ),
                                                endAdornment: (
                                                    <InputAdornment position="end">
                                                        <IconButton
                                                            onClick={() =>
                                                                field === "password"
                                                                    ? setShowPassword(!showPassword)
                                                                    : setShowConfirmPassword(!showConfirmPassword)
                                                            }
                                                        >
                                                            {field === "password" ? (
                                                                showPassword ? (
                                                                    <FiEyeOff />
                                                                ) : (
                                                                    <FiEye />
                                                                )
                                                            ) : showConfirmPassword ? (
                                                                <FiEyeOff />
                                                            ) : (
                                                                <FiEye />
                                                            )}
                                                        </IconButton>
                                                    </InputAdornment>
                                                ),
                                            }}
                                        />
                                    </Grid>
                                ))}
                            </Grid>

                            <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
                                <Button variant="outlined" onClick={() => setOpenDialog(true)} disabled={loading}>
                                    Cancel
                                </Button>
                                <Button type="submit" variant="contained" disabled={loading}>
                                    {loading ? <CircularProgress size={24} /> : "Update Profile"}
                                </Button>
                            </Box>
                        </Box>
                    </StyledPaper>

                    <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
                        <DialogTitle>Discard Changes?</DialogTitle>
                        <DialogContent>
                            <Typography>Are you sure you want to discard all changes?</Typography>
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={() => setOpenDialog(false)}>Cancel</Button>
                            <Button
                                onClick={() =>
                                    setFormData({
                                        fullName: "",
                                        email: "",
                                        username: "",
                                        password: "",
                                        confirmPassword: "",
                                    })
                                }
                                color="error"
                            >
                                Discard
                            </Button>
                        </DialogActions>
                    </Dialog>
                </Container>
            </ThemeProvider>
        </DashboardLayout>
    );
};

export default UserProfile;