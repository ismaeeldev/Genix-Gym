import React, { useState, useEffect } from "react";
import {
    Modal,
    Box,
    Typography,
    TextField,
    Button,
    IconButton,
    Alert,
    CircularProgress,
    useMediaQuery
} from "@mui/material";
import { styled } from "@mui/system";
import { FiX, FiUser, FiMail, FiPhone } from "react-icons/fi";
import PropTypes from "prop-types";
import Cookies from "js-cookie";


const StyledModal = styled(Modal)(({ theme }) => ({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& .MuiBackdrop-root": {  // Override the default black backdrop
        backgroundColor: "rgba(0, 0, 0, 0.04)", // Light transparent background
        backdropFilter: "blur(1px)",  // 🔥 Apply blur effect
        transition: "opacity 0.2s ease-in-out",  // 🚀 Fast smooth transition

    }
}));

const ModalContent = styled(Box)(({ theme }) => ({
    backgroundColor: "#ffffff",
    borderRadius: "8px",
    padding: "24px",
    position: "relative",
    width: "90%",
    maxWidth: "500px",
    boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
    animation: "fadeIn 0.3s ease-in-out",
    "@keyframes fadeIn": {
        "0%": {
            opacity: 0,
            transform: "scale(0.9)"
        },
        "100%": {
            opacity: 1,
            transform: "scale(1)"
        }
    }
}));

const UpdateModal = ({ open, onClose, user }) => {
    const jwtToken = Cookies.get("jwtToken");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const [touched, setTouched] = useState({});
    const isMobile = useMediaQuery("(max-width:600px)");
    const safeUser = user || {}; // Ensure user is at least an empty object

    const [formData, setFormData] = useState({
        name: safeUser.name || "",
        email: safeUser.email || "",
        phone: safeUser.phone || "",
        address: safeUser.address || "",
        blood_group: safeUser.blood_group || "",
    });

    useEffect(() => {
        if (user) {
            setFormData({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                blood_group: user.blood_group || ""
            });
        }
    }, [user]);





    useEffect(() => {
        const handleEscape = (event) => {
            if (event.key === "Escape") {
                onClose();
            }

        };
        window.addEventListener("keydown", handleEscape);
        return () => window.removeEventListener("keydown", handleEscape);
    }, [onClose]);

    const handleChange = (field) => (event) => {
        const value = event.target.value;
        setFormData((prev) => ({
            ...prev,
            [field]: value,
        }));
    };


    const handleBlur = (field) => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    };

    const validateForm = () => {
        const { name, email, phone } = formData;
        const errors = {};

        if (!name) errors.name = "Name is required";
        if (!email) errors.email = "Email is required";
        else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email)) errors.email = "Invalid email format";
        if (!phone) errors.phone = "Phone is required";

        if (Object.keys(errors).length) {
            setError(errors);
            return false;
        }
        return true;
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        try {
            const response = await fetch(`http://localhost:8080/api/member/update-member/${user.id}`, {
                method: "PUT", // Use the appropriate HTTP method
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    // Replace with actual member data you want to send
                    email: formData.email,
                    phone: formData.phone,
                    address: formData.address,
                    blood_group: formData.blood_group
                }),
            });

            const data = await response.json();

            if (response.ok) {
                swal({
                    title: data.message,
                    text: "",
                    icon: "success",
                    button: "Done",
                });
                onClose();
            } else {
                setError(data.message || "Failed to update profile. Please try again.");
            }
        } catch (err) {
            setError("Failed to update profile. Please try again.");
        } finally {
            setLoading(false);
        }
    };


    const handleBackdropClick = (event) => {
        // Prevent closing the modal when backdrop is clicked if loading
        if (!loading) {
            onClose();
        }
    };

    return (
        <StyledModal
            open={open}
            onClose={handleBackdropClick}
            aria-labelledby="update-profile-modal"
            aria-describedby="modal-to-update-user-profile"
            disableEscapeKeyDown={loading}
        >
            <ModalContent sx={{ padding: isMobile ? "16px" : "24px" }}>
                <IconButton
                    aria-label="close"
                    onClick={() => !loading && onClose()}
                    sx={{
                        position: "absolute",
                        right: 8,
                        top: 8
                    }}
                >
                    <FiX />
                </IconButton>

                <Typography variant="h5" component="h2" gutterBottom sx={{ mb: 3, color: "white !important" }}>
                    Update Profile
                </Typography>

                {error && (
                    <Alert severity="error" sx={{ mb: 2 }}>
                        {error}
                    </Alert>
                )}

                <Box component="form" noValidate>
                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiUser style={{ marginRight: "8px" }} />
                        <TextField
                            fullWidth
                            label="Name"
                            value={formData.name}
                            onChange={handleChange("name")}
                            onBlur={handleBlur("name")}
                            error={touched.name && !formData.name}
                            helperText={touched.name && !formData.name ? "Name is required" : ""}
                            disabled={true}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiMail style={{ marginRight: "8px" }} />
                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            value={formData.email}
                            onChange={handleChange("email")}
                            onBlur={handleBlur("email")}
                            error={touched.email && (!formData.email || !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(formData.email))}
                            helperText={touched.email && !formData.email ? "Email is required" : ""}
                            disabled={loading}
                            sx={{
                                "& .MuiInputBase-input": { color: "#000" }, // Strictly set input text color to black
                                "& .MuiFormLabel-root": { color: "rgba(0, 0, 0, 0.6)" }, // Label color
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiPhone style={{ marginRight: "8px" }} />
                        <TextField
                            fullWidth
                            label="Phone"
                            value={formData.phone}
                            onChange={handleChange("phone")}
                            onBlur={handleBlur("phone")}
                            error={touched.phone && !formData.phone}
                            helperText={touched.phone && !formData.phone ? "Phone number is required" : ""}
                            disabled={loading}
                            sx={{
                                "& .MuiInputBase-input": { color: "#000" }, // Strictly set input text color to black
                                "& .MuiFormLabel-root": { color: "rgba(0, 0, 0, 0.6)" }, // Label color
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiPhone style={{ marginRight: "8px" }} />
                        <TextField
                            fullWidth
                            label="Address"
                            value={formData.address}
                            onChange={handleChange("address")}
                            onBlur={handleBlur("address")}
                            error={touched.address && !formData.address}
                            helperText={touched.address && !formData.address ? "Address is required" : ""}
                            disabled={loading}
                            sx={{
                                "& .MuiInputBase-input": { color: "#000" }, // Strictly set input text color to black
                                "& .MuiFormLabel-root": { color: "rgba(0, 0, 0, 0.6)" }, // Label color
                            }}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiPhone style={{ marginRight: "8px" }} />
                        <TextField
                            fullWidth
                            label="Blood Group"
                            value={formData.blood_group}
                            onChange={handleChange("blood_group")}
                            onBlur={handleBlur("blood_group")}
                            error={touched.blood_group && !formData.blood_group}
                            helperText={touched.blood_group && !formData.blood_group ? "Blood Group  is required" : ""}
                            disabled={loading}
                            sx={{
                                "& .MuiInputBase-input": { color: "#000" }, // Strictly set input text color to black
                                "& .MuiFormLabel-root": { color: "rgba(0, 0, 0, 0.6)" }, // Label color
                            }}
                        />
                    </Box>

                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleSubmit}
                        disabled={loading}
                        sx={{
                            mt: 2,
                            height: 48,
                            position: "relative",
                            backgroundColor: loading ? "grey" : "primary.main",
                        }}
                    >
                        {loading && <CircularProgress size={24} sx={{ position: "absolute", left: "50%", transform: "translateX(-50%)" }} />}
                        {loading ? "Updating..." : "Update Profile"}
                    </Button>
                </Box>
            </ModalContent>
        </StyledModal>
    );
};

UpdateModal.propTypes = {
    open: PropTypes.bool.isRequired,
    onClose: PropTypes.func.isRequired,
    user: PropTypes.object.isRequired,
};

export default UpdateModal;
