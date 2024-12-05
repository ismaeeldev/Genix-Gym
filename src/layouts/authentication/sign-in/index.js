import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-register-2.jpg";
import Cookies from "js-cookie";
import swal from 'sweetalert';


function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");


  // Toggle the remember me switch
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Handle form submission
  const onChangeLogin = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username || !password) {
      swal({
        title: "",
        text: "Please Enter username or Password",
        icon: "info",
        button: "Done",
      });
      return;
    }

    try {
      const response = await fetch("http://localhost:8080/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password }),
      });

      // Check if the response is OK (status 200)
      if (response.ok) {
        const data = await response.json();
        const token = data.jwtToken;

        if (token) {
          const modifiedToken = token.substring(7); // Remove "Bearer " prefix
          Cookies.set("jwtToken", modifiedToken, { expires: 7 });
          // alert("Login successful! Token saved in the cookie.");
          swal({
            title: data.message,
            text: "",
            icon: "success",
            button: "Done",
          });
          navigate("/dashboard");
        } else {
          throw new Error("JWT Token not found in response body.");
        }
      } else {
        // Handle errors based on the API response
        const errorData = await response.json();
        swal({
          title: errorData.message,
          text: "",
          icon: "warning",
          button: "Done",
        });
      }
    } catch (error) {
      console.error("Error during login:", error);
      swal({
        title: error.message,
        text: "",
        icon: "error",
        button: "Done",
      });
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <Card>
        <MDBox
          variant="gradient"
          bgColor="info"
          borderRadius="lg"
          coloredShadow="info"
          mx={2}
          mt={-3}
          p={2}
          mb={1}
          textAlign="center"
        >
          <MDTypography variant="h4" fontWeight="medium" color="white" mt={1}>
            Sign in
          </MDTypography>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={onChangeLogin}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="Username"
                fullWidth
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                type="password"
                label="Password"
                fullWidth
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={4} mb={1}>
              <MDButton type="submit" variant="gradient" color="info" fullWidth>
                Sign in
              </MDButton>
            </MDBox>
            <MDBox mt={3} mb={1} textAlign="center">
              <MDTypography variant="button" color="text">
                For Any Query{" "}
                <MDTypography
                  component={Link}
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Contact to Administration
                </MDTypography>
              </MDTypography>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
