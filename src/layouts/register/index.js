import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";
import FormGroup from "@mui/material/FormGroup";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { Cookie } from "@mui/icons-material";

function Register() {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        blood_group: "",
        age: "",
        gender: "",
        membership_type: "Daily",
    });

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const jwtToken = Cookies.get("jwtToken"); // Retrieve JWT token from cookies
        try {
            const response = await fetch("http://localhost:8080/api/member/add-members", {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // Parse the JSON response

            if (!response.ok) {
                // Display the message from the API for errors
                throw new Error(data.message || "Failed to register. Please try again.");
            }

            // Display the success message from the API
            console.log("Registration successful:", data);
            alert(data.message || "Registration successful!");
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                blood_group: "",
                age: "",
                gender: "",
                membership_type: "Daily",
            });

        } catch (error) {
            console.error("Error:", error);
            alert(error.message || "An error occurred.");
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                blood_group: "",
                age: "",
                gender: "",
                membership_type: "Daily",
            });

        }
    };


    return (
        <DashboardLayout>
            <DashboardNavbar />
            <MDBox
                display="flex"
                justifyContent="center"
                alignItems="center"
                minHeight="80vh"
                px={2}
            >
                <Card
                    sx={{
                        width: "100%",
                        maxWidth: 600,
                        p: 2,
                        boxShadow: 3,
                    }}
                >
                    <MDBox
                        variant="gradient"
                        bgColor="info"
                        borderRadius="lg"
                        coloredShadow="success"
                        textAlign="center"
                        py={3}
                    >
                        <MDTypography variant="h4" fontWeight="medium" color="white">
                            Join us today
                        </MDTypography>
                        <MDTypography display="block" variant="button" color="white" my={1}>
                            Register new Member
                        </MDTypography>
                    </MDBox>
                    <MDBox pt={4} pb={3} px={3}>
                        <MDBox component="form" role="form" onSubmit={handleSubmit}>
                            <Grid container spacing={2}>
                                <Grid item xs={12} sm={6}>
                                    <MDInput
                                        type="text"
                                        label="Name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput
                                        type="email"
                                        label="Email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput
                                        type="text"
                                        label="Phone Number"
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput
                                        type="text"
                                        label="Address"
                                        name="address"
                                        value={formData.address}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput
                                        type="text"
                                        label="Gender"
                                        name="gender"
                                        value={formData.gender}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput
                                        type="text"
                                        label="Age"
                                        name="age"
                                        value={formData.age}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <MDInput
                                        type="text"
                                        label="Blood Group"
                                        name="blood_group"
                                        value={formData.blood_group}
                                        onChange={handleChange}
                                        variant="standard"
                                        fullWidth
                                    />
                                </Grid>
                                <Grid item xs={12}>
                                    <FormGroup row>
                                        {["Daily", "Monthly", "Yearly"].map((option) => (
                                            <FormControlLabel
                                                key={option}
                                                control={
                                                    <Checkbox
                                                        checked={formData.membership_type === option}
                                                        onChange={() =>
                                                            setFormData((prev) => ({
                                                                ...prev,
                                                                membership_type: option,
                                                            }))
                                                        }
                                                        name="membership_type"
                                                    />
                                                }
                                                label={option}
                                            />
                                        ))}
                                    </FormGroup>
                                </Grid>

                                <Grid item xs={12}>
                                    <MDButton
                                        type="submit"
                                        variant="gradient"
                                        color="info"
                                        fullWidth
                                    >
                                        Register
                                    </MDButton>
                                </Grid>
                            </Grid>
                        </MDBox>
                    </MDBox>
                </Card>
            </MDBox>
        </DashboardLayout>
    );
}

export default Register;
