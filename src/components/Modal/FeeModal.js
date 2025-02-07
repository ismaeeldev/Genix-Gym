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
import { FiX, FiUser, FiMail, FiPhone, FiCreditCard } from "react-icons/fi";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";



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
    const [feeData, setFeeData] = useState({ name: "", fee: "", membership_type: "", paymentMethod: "" });

    useEffect(() => {
        if (user) {
            setFeeData({
                name: user.name || "",
                fee: "",
                membership_type: user.membership_type || "",
                paymentMethod: user.paymentMethod || "",
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
        setFeeData(prev => ({
            ...prev,
            [field]: event.target.value
        }));
        setError("");
    };

    const handleBlur = (field) => () => {
        setTouched(prev => ({
            ...prev,
            [field]: true
        }));
    };

    // const validateForm = () => {
    //     const { name, fee } = feeData;
    //     const errors = {};

    //     if (!name) errors.name = "Name is required";
    //     if (!fee) errors.fee = "Fee is required";

    //     if (Object.keys(errors).length) {
    //         setError(errors);
    //         return false;
    //     }
    //     return true;
    // };

    const handleSubmit = async () => {
        setError("");
        setLoading(true);

        try {
            const feeResponse = await fetch(`http://localhost:8080/api/member/${user.id}/update-status?amountPaid=${feeData.fee}`, {
                method: "POST",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                },
            });

            const feeDataResponse = await feeResponse.json();

            if (!feeResponse.ok) {
                throw new Error(feeDataResponse.message || "Failed to update Fee Status.");
            }


            // a delay before updating membership
            await new Promise(resolve => setTimeout(resolve, 2000));

            // Step 3: Update the Membership
            const membershipResponse = await fetch(`http://localhost:8080/api/member/update-member/${user.id}`, {
                method: "PUT",
                headers: {
                    Authorization: `Bearer ${jwtToken}`,
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ membership_type: feeData.membership_type }),
            });

            const membershipDataResponse = await membershipResponse.json();

            if (!membershipResponse.ok) {
                throw new Error(membershipDataResponse.message || "Failed to update Membership Status.");
            }

            // alert(membershipDataResponse.message);

            onClose();
            swal({
                title: feeDataResponse.message,
                text: "",
                icon: "success",
                button: "Done",
            });

        } catch (err) {
            setError(err.message || "An error occurred during the update.");
        } finally {
            setLoading(false);
        }
    };



    const handleBackdropClick = (event) => {
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
                            value={feeData.name}
                            onChange={handleChange("name")}
                            onBlur={handleBlur("name")}
                            error={touched.name && !feeData.name}
                            helperText={touched.name && !feeData.name ? "Name is required" : ""}
                            disabled={true}
                        />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiMail style={{ marginRight: "8px" }} />
                        <TextField
                            fullWidth
                            label="Enter a fee"
                            type="number"
                            value={feeData.fee}  // Set correct value
                            onChange={handleChange("fee")}
                            onBlur={handleBlur("fee")}
                            error={touched.fee && !feeData.fee}
                            helperText={touched.fee && !feeData.fee ? "Fee is required" : ""} // Adjust error message
                            disabled={loading}
                            sx={{
                                "& .MuiInputBase-input": { color: "#000" }, // Strictly set input text color to black
                                "& .MuiFormLabel-root": { color: "rgba(0, 0, 0, 0.6)" }, // Label color
                            }}
                        />

                    </Box>
                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiCreditCard style={{ marginRight: "8px" }} />
                        <Select
                            onChange={handleChange("paymentMethod")}
                            value={feeData.paymentMethod}
                            displayEmpty
                            sx={{
                                width: { xs: "100%", sm: "200px" }, // Responsive width
                                padding: "10px", // Padding for the input
                                fontSize: "16px", // Font size
                                "& .MuiInputBase-input": {
                                    color: "#000", // Strictly set input text color to black
                                    fontSize: "16px", // Font size for the input text
                                },
                                "& .MuiFormLabel-root": {
                                    color: "rgba(0, 0, 0, 0.6)", // Label color
                                },
                            }}

                        >
                            <MenuItem value="" disabled>Payment Method</MenuItem>
                            <MenuItem value="cash">Cash</MenuItem>
                            <MenuItem value="check">Check</MenuItem>
                            <MenuItem value="online">Online</MenuItem>
                        </Select>

                    </Box>


                    <Box sx={{ display: "flex", alignItems: "flex-end", mb: 2 }}>
                        <FiUser style={{ marginRight: "8px" }} />
                        <Select
                            onChange={handleChange("membership_type")}
                            value={feeData.membership_type}
                            displayEmpty
                            sx={{
                                width: { xs: "100%", sm: "200px" }, // Responsive width
                                padding: "10px", // Padding for the input
                                fontSize: "16px", // Font size
                                "& .MuiInputBase-input": {
                                    color: "#000", // Strictly set input text color to black
                                    fontSize: "16px", // Font size for the input text
                                },
                                "& .MuiFormLabel-root": {
                                    color: "rgba(0, 0, 0, 0.6)", // Label color
                                },
                            }}

                        >
                            <MenuItem value="" disabled>Select Membership</MenuItem>
                            <MenuItem value="Daily">Daily</MenuItem>
                            <MenuItem value="Monthly">Monthly</MenuItem>
                            <MenuItem value="Yearly">Yearly</MenuItem>
                        </Select>

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
