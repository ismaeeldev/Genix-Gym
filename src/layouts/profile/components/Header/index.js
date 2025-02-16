import { useState, useEffect } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import AppBar from "@mui/material/AppBar";
import Icon from "@mui/material/Icon";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
// Images

function ContactForm() {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  useEffect(() => {
    function handleTabsOrientation() {
      return window.innerWidth < 600 ? setTabsOrientation("vertical") : setTabsOrientation("horizontal");
    }

    window.addEventListener("resize", handleTabsOrientation);
    handleTabsOrientation();

    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle the form submission logic here (e.g., send data to an API or show a success message)
  };

  return (
    <MDBox position="relative" mb={5}>
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
              <Grid item xs={12}>
                <AppBar position="static">
                  <Tabs
                    orientation={tabsOrientation}
                    value="Contact Us"
                  >
                    <Tab
                      label="Contact Us"
                      icon={
                        <Icon fontSize="small" sx={{ mt: -0.25 }}>
                          person
                        </Icon>
                      }
                    />
                  </Tabs>
                </AppBar>
              </Grid>
            </Grid>

            <MDTypography
              variant="button"
              color="white"
              fontWeight="regular"
              align="center"
              sx={{ marginTop: 1 }}
            >
              Get in touch with us
            </MDTypography>
          </MDBox>

          <MDBox pt={4} pb={3} px={3}>
            <form onSubmit={handleSubmit}>
              <Grid container spacing={3} mt={2} justifyContent="center">
                <Grid item xs={12} sm={10} md={8}>
                  <TextField
                    label="Your Name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                  <TextField
                    label="Your Email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                  <TextField
                    label="Your Message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    fullWidth
                    multiline
                    rows={4}
                    required
                  />
                </Grid>
                <Grid item xs={12} sm={10} md={8}>
                  <Button type="submit" variant="contained" color="primary" fullWidth>
                    Send Message
                  </Button>
                </Grid>
              </Grid>
            </form>
          </MDBox>
        </Card>
      </MDBox>
    </MDBox>
  );
}

export default ContactForm;
