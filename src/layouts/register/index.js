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
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import swal from 'sweetalert';



import AppBar from "@mui/material/AppBar";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Icon from "@mui/material/Icon";

function Register() {
    const jwtToken = Cookies.get("jwtToken"); // Retrieve JWT token from cookies
    const [tabsOrientation, setTabsOrientation] = useState("horizontal");
    const [tabValue, setTabValue] = useState(0);
    const [TrainerRegisterForm, setRegistrationForm] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        blood_group: "",
        dateOfBirth: "",
        gender: "",
        membership_type: "Daily",
    });

    const [trainerData, setTrainerData] = useState({
        name: "",
        email: "",
        phone: "",
        salary: "",
        experienceYears: "",
        gender: "",
        bio: "",
    })

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "checkbox" ? checked : value,
        }));
    };

    const handleTrainerChange = (e) => {
        const { name, value } = e.target;
        setTrainerData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };


    const handleSetTabValue = (event, newValue) => {
        setTabValue(newValue);
        setRegistrationForm(newValue === 1); // Set Trainer form if tab 1 is selected
    };

    const handleDateChange = (newDate) => {
        const formattedDate = dayjs(newDate).format('YYYY-MM-DDTHH:mm:ss');
        setFormData((prev) => ({
            ...prev,
            dateOfBirth: formattedDate,
        }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        const API = "http://localhost:8080/api/member/add-members";


        try {

            const response = await fetch(API, {
                method: "POST",
                headers: {
                    'Authorization': `Bearer ${jwtToken}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData),
            });

            const data = await response.json(); // Parse the JSON response

            if (!response.ok) {
                // Display the messdateOfBirth from the API for errors
                throw new Error(data.message || "Failed to register. Please try again.");
            }

            // Display the success messdateOfBirth from the API
            console.log("Registration successful:", data);
            swal({
                title: data.message,
                text: "",
                icon: "success",
                button: "Done",
            });
            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                blood_group: "",
                dateOfBirth: "",
                gender: "",
                membership_type: "Daily",
            });

        } catch (error) {
            console.error("Error:", error);
            swal({
                title: error.message,
                text: "",
                icon: "error",
                button: "Done",
            });

            setFormData({
                name: "",
                email: "",
                phone: "",
                address: "",
                blood_group: "",
                dateOfBirth: "",
                gender: "",
                membership_type: "Daily",
            });

        }
    };

    const handleTrainerSubmit = async () => {
        console.log(trainerData)
    }


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
                        {/* <MDTypography variant="h4" fontWeight="medium" color="white">
                            Join us today
                        </MDTypography> */}
                        <Grid
                            container
                            justifyContent="center"  // Center horizontally
                            alignItems="center"      // Center vertically (optional)
                        >
                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                                sx={{
                                    display: "flex",
                                    justifyContent: "center",
                                }}
                            >
                                <AppBar position="static">
                                    <Tabs
                                        orientation={tabsOrientation}
                                        value={tabValue}
                                        onChange={handleSetTabValue}
                                    >
                                        <Tab
                                            label="Member"
                                            icon={
                                                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                                    person
                                                </Icon>
                                            }
                                        />
                                        <Tab
                                            label="Trainer"
                                            icon={
                                                <Icon fontSize="small" sx={{ mt: -0.25 }}>
                                                    badge
                                                </Icon>
                                            }
                                        />
                                    </Tabs>
                                </AppBar>
                            </Grid>
                        </Grid>

                        <MDTypography
                            display="block"
                            variant="button"
                            color={
                                (!TrainerRegisterForm && formData.phone && (formData.phone.length < 11 || formData.phone.length > 11)) ||
                                    (TrainerRegisterForm && trainerData.phone && (trainerData.phone.length < 11 || trainerData.phone.length > 11))
                                    ? "error"
                                    : "white"
                            }
                            fontWeight={
                                (!TrainerRegisterForm && formData.phone && (formData.phone.length < 11 || formData.phone.length > 11)) ||
                                    (TrainerRegisterForm && trainerData.phone && (trainerData.phone.length < 11 || trainerData.phone.length > 11))
                                    ? "bold"
                                    : "regular"
                            }
                            my={1}
                        >
                            {!TrainerRegisterForm
                                ? formData.phone && (formData.phone.length < 11 || formData.phone.length > 11)
                                    ? "Invalid phone number format"
                                    : "Register New Member"
                                : trainerData.phone && (trainerData.phone.length < 11 || trainerData.phone.length > 11)
                                    ? "Invalid phone number format"
                                    : "Register New Trainer"}
                        </MDTypography>






                    </MDBox>

                    <MDBox pt={4} pb={3} px={3}>
                        {!TrainerRegisterForm ?
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
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <DatePicker
                                                label="Date of Birth"
                                                value={formData.dateOfBirth ? dayjs(formData.dateOfBirth) : null}
                                                onChange={handleDateChange} // Use the separate date handler
                                                slotProps={{ textField: { variant: "standard", fullWidth: true } }}
                                            />
                                        </LocalizationProvider>
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
                                            Register Member
                                        </MDButton>
                                    </Grid>
                                </Grid>
                            </MDBox> :

                            // trainer register field
                            <MDBox component="form" role="form" onSubmit={handleTrainerSubmit}>
                                <Grid container spacing={2}>
                                    <Grid item xs={12} sm={6}>
                                        <MDInput
                                            type="text"
                                            label="Name"
                                            name="name"
                                            value={trainerData.name}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MDInput
                                            type="email"
                                            label="Email"
                                            name="email"
                                            value={trainerData.email}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MDInput
                                            type="text"
                                            label="Phone Number"
                                            name="phone"
                                            value={trainerData.phone}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MDInput
                                            type="text"
                                            label="Salary"
                                            name="salary"
                                            value={trainerData.salary}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm={6}>
                                        <MDInput
                                            type="text"
                                            label="Gender"
                                            name="gender"
                                            value={trainerData.gender}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>


                                    <Grid item xs={12} sm={6}>
                                        <MDInput
                                            type="number"
                                            label="Experience Years "
                                            name="experienceYears"
                                            value={trainerData.experienceYears}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>

                                    <Grid item xs={12}>
                                        <MDInput
                                            type="text"
                                            label="bio"
                                            name="bio"
                                            value={trainerData.bio}
                                            onChange={handleTrainerChange}
                                            variant="standard"
                                            fullWidth
                                        />
                                    </Grid>


                                    <Grid item xs={12}>
                                        <MDButton
                                            // type="submit"
                                            variant="gradient"
                                            color="info"
                                            fullWidth
                                            onClick={handleTrainerSubmit}
                                        >
                                            Register Trainer
                                        </MDButton>
                                    </Grid>
                                </Grid>
                            </MDBox>
                        }
                    </MDBox>
                </Card>
            </MDBox>
        </DashboardLayout>
    );
}

export default Register;
