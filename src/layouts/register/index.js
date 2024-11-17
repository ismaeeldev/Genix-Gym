/**
=========================================================
* Material Dashboard 2 React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.
*/

import { useState } from "react";

// @mui material components
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
// import MDAlert from "components/MDAlert";
import MDButton from "components/MDButton";
// import MDSnackbar from "components/MDSnackbar";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import React from "react";

// @mui material components
import Checkbox from "@mui/material/Checkbox";
// import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from "@mui/material/FormGroup";
// import Cookies from "js-cookie";
// import { useNavigate } from "react-router-dom";


// Material Dashboard 2 React components
import MDInput from "components/MDInput";

// Authentication layout components
// import CoverLayout from "layouts/authentication/components/CoverLayout";

// // Images
// // import bgImage from "assets/images/bg-sign-up-cover.jpeg";
// import bgImage from "assets/images/bg-register-3.jpg";


function Register() {

    // const navigate = useNavigate();

    const [selectedOption, setSelectedOption] = React.useState("Daily");

    const handleChange = (event) => {
        setSelectedOption(event.target.name);
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
                        <MDBox component="form" role="form">
                            <Grid container spacing={2}>
                                {/* Name and Email */}
                                <Grid item xs={12} sm={6}>
                                    <MDInput type="text" label="Name" variant="standard" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput type="email" label="Email" variant="standard" fullWidth />
                                </Grid>
                                {/* Phone Number and Address */}
                                <Grid item xs={12} sm={6}>
                                    <MDInput type="text" label="Phone Number" variant="standard" fullWidth />
                                </Grid>
                                <Grid item xs={12} sm={6}>
                                    <MDInput type="text" label="Address" variant="standard" fullWidth />
                                </Grid>
                                {/* Blood Group */}
                                <Grid item xs={12}>
                                    <MDInput type="text" label="Blood Group" variant="standard" fullWidth />
                                </Grid>
                                {/* Checkbox Group */}
                                <Grid item xs={12}>
                                    <FormGroup row>
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={selectedOption == "Daily"} onChange={handleChange} name="Daily" />
                                            }
                                            label="Daily"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={selectedOption == "Monthly"} onChange={handleChange} name="Monthly" />
                                            }
                                            label="Monthly"
                                        />
                                        <FormControlLabel
                                            control={
                                                <Checkbox checked={selectedOption == "Yearly"} onChange={handleChange} name="Yearly" />
                                            }
                                            label="Yearly"
                                        />
                                    </FormGroup>
                                </Grid>
                                {/* Terms and Conditions */}
                                <Grid item xs={12}>
                                    <MDBox display="flex" alignItems="center">
                                        <Checkbox />
                                        <MDTypography
                                            variant="button"
                                            fontWeight="regular"
                                            color="text"
                                            sx={{ cursor: "pointer", userSelect: "none" }}
                                        >
                                            &nbsp;&nbsp;I agree to the&nbsp;
                                        </MDTypography>

                                    </MDBox>
                                </Grid>
                                {/* Register Button */}
                                <Grid item xs={12}>
                                    <MDButton variant="gradient" color="info" fullWidth>
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
