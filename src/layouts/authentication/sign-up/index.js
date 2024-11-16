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

// react-router-dom components
import React from "react";
import { Link } from "react-router-dom";

// @mui material components
import Card from "@mui/material/Card";
import Checkbox from "@mui/material/Checkbox";
import FormControl from '@mui/material/FormControl';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormGroup from "@mui/material/FormGroup";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";


// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import CoverLayout from "layouts/authentication/components/CoverLayout";

// Images
// import bgImage from "assets/images/bg-sign-up-cover.jpeg";
import bgImage from "assets/images/bg-register-3.jpg";


function Cover() {
  const navigate = useNavigate();

  const [state, setState] = React.useState({
    Daily: true,
    Monthly: false,
    Yearly: false,
  });

  const handleChange = (event) => {
    setState({
      ...state,
      [event.target.name]: event.target.checked,
    });
  };

 

  const { Daily, Monthly, Yearly } = state;

  return (
    <CoverLayout image={bgImage}>
      <Card
        sx={{
          width: "600px", // Set fixed width for the form
          margin: "0 auto 0 0", // Center horizontally with a right margin
          position: "absolute",
          right: "460px"
        }}
      >
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="success"
          mx={2}
          mt={-3}
          p={3}
          mb={1}
          sx={{
            maxWidth: "600px", // Expanding form width
            margin: "0 auto", // Centering the form
            width: "600px"
          }}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Join us today
          </MDTypography>
          <MDTypography display="block" variant="button" color="white" my={1}>
            Register new Member
          </MDTypography>
        </MDBox>
        <MDBox
          pt={4}
          pb={3}
          px={3}
          sx={{
            maxWidth: "600px", // Expanding form width
            margin: "0 auto", // Centering the form
            width: "600px"
          }}

        >
          <MDBox component="form" role="form">
            <MDBox display="flex" justifyContent="space-between" gap={2} mb={2}>
              <MDInput type="text" label="Name" variant="standard" fullWidth />
              <MDInput type="email" label="Email" variant="standard" fullWidth />
            </MDBox>

            <MDBox display="flex" justifyContent="space-between" gap={2} mb={2}>
              <MDInput type="text" label="Phone Number" variant="standard" fullWidth />
              <MDInput type="text" label="Address" variant="standard" fullWidth />
            </MDBox>

            <MDBox display="flex" alignItems="center" gap={2} mb={2}>
              <MDInput type="text" label="Blood Group" variant="standard" fullWidth />
            </MDBox>

            <MDBox mb={2}>
              <FormGroup row> {/* Add row prop for horizontal layout */}
                <FormControlLabel
                  control={
                    <Checkbox checked={Daily} onChange={handleChange} name="Daily" />
                  }
                  label="Daily"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={Monthly} onChange={handleChange} name="Monthly" />
                  }
                  label="Monthly"
                />
                <FormControlLabel
                  control={
                    <Checkbox checked={Yearly} onChange={handleChange} name="Yearly" />
                  }
                  label="Yearly"
                />
              </FormGroup>
            </MDBox>

            <MDBox display="flex" alignItems="center" ml={-1}>
              <Checkbox />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;I agree to the&nbsp;
              </MDTypography>
              <MDTypography
                component="a"
                href="#"
                variant="button"
                fontWeight="bold"
                color="info"
                textGradient
              >
                Terms and Conditions
              </MDTypography>
            </MDBox>

            <MDBox mt={4} mb={1}>
              <MDButton variant="gradient" color="info" fullWidth>
                Register
              </MDButton>
            </MDBox>


          </MDBox>
        </MDBox>
      </Card>
    </CoverLayout>
  );
}

export default Cover;

