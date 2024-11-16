import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import Grid from "@mui/material/Grid";
import MuiLink from "@mui/material/Link";
import FacebookIcon from "@mui/icons-material/Facebook";
import GitHubIcon from "@mui/icons-material/GitHub";
import GoogleIcon from "@mui/icons-material/Google";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";
import BasicLayout from "layouts/authentication/components/BasicLayout";
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

function Basic() {
  const navigate = useNavigate();
  const [rememberMe, setRememberMe] = useState(false);
  const [username, setusername] = useState("");
  const [password, setPassword] = useState("");

  // Toggle the remember me switch
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  // Handle form submission
  const onChangeLogin = async (event) => {
    event.preventDefault();

    // Validate inputs
    if (!username || !password) {
      alert("Please enter both username and password!");
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

      // Handle different status codes
      if (response.ok) {
        // This handles status codes in the range 200-299
        const data = await response.json(); // Assume the token is in the response body
        const token = data.jwtToken;

        if (token) {
          const modifiedToken = token.substring(7);

          // if (typeof window !== "undefined") {
          //   Cookies.set("jwtToken", modifiedToken, {
          //     path: "/", // Cookie accessible throughout the app
          //     expires: 7, // Expires in 7 days
          //   });
          // }

          Cookies.set("jwtToken", modifiedToken, { expires: 7 });

          alert("Login successful! Token saved in the cookie.");
          navigate("/dashboard");
        } else {
          throw new Error("JWT Token not found in response body.");
        }
      } else {
        // If the response is not ok (e.g., 4xx or 5xx)
        const errorData = await response.json();

        // Handle specific error codes
        switch (response.status) {
          case 400:
            throw new Error("Bad Request: Please check the username and password.");
          case 401:
            throw new Error("Unauthorized: Invalid username or password.");
          case 500:
            throw new Error("Server Error: Something went wrong on the server.");
          default:
            throw new Error(errorData.message || "Login failed! Please try again.");
        }
      }
    } catch (error) {
      // Log the error to the console for debugging
      console.error("Error during login:", error);
      alert(`Error: ${error.message}`);
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
          <Grid container spacing={3} justifyContent="center" sx={{ mt: 1, mb: 2 }}>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <FacebookIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GitHubIcon color="inherit" />
              </MDTypography>
            </Grid>
            <Grid item xs={2}>
              <MDTypography component={MuiLink} href="#" variant="body1" color="white">
                <GoogleIcon color="inherit" />
              </MDTypography>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form" onSubmit={onChangeLogin}>
            <MDBox mb={2}>
              <MDInput
                type="text"
                label="username"
                fullWidth
                value={username}
                onChange={(e) => setusername(e.target.value)}
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
                Don&apos;t have an account?{" "}
                <MDTypography
                  component={Link}
                  to="/authentication/sign-up"
                  variant="button"
                  color="info"
                  fontWeight="medium"
                  textGradient
                >
                  Sign up
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
