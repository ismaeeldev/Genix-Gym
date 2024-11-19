import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import RadioGroup from "@mui/material/RadioGroup";
import FormControlLabel from "@mui/material/FormControlLabel";
import Radio from "@mui/material/Radio";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import DataTable from "examples/Tables/DataTable";
// Data
import authorsTableData from "layouts/tables/data/authorsTableData";
import projectsTableData from "layouts/tables/data/projectsTableData";

function Tables() {
  const { columns, rows } = authorsTableData();
  const { columns: pColumns, rows: pRows } = projectsTableData();

  const [selectedOption, setSelectedOption] = useState("name");
  const [searchQuery, setSearchQuery] = useState("");
  const [membership, setMembership] = useState("");
  const [feeStatus, setFeeStatus] = useState("");

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
    setSearchQuery(""); // Clear search query when the option changes
    setMembership("");
    setFeeStatus("");
  };

  const handleMembershipChange = (event) => {
    setMembership(event.target.value);
  };

  const handleFeeStatusChange = (event) => {
    setFeeStatus(event.target.value);
  };

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const handleSearch = () => {
    console.log(
      "Search Query:",
      searchQuery,
      "Search by:",
      selectedOption,
      "Membership:",
      membership,
      "Fee Status:",
      feeStatus
    );
    // Implement your filtering logic here
  };

  return (
    <DashboardLayout>
      <DashboardNavbar />

      <MDBox pt={6} pb={3}>
        <Grid container spacing={6}>
          <Grid item xs={12}>

            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  User Data
                </MDTypography>
              </MDBox>
              <MDBox pr={1} mb={2}>
                {/* Responsive Search Input and Filters */}
                <MDBox
                  display="flex"
                  flexDirection={{ xs: "column", sm: "row" }}
                  alignItems="center"
                  justifyContent="center"
                  sx={{
                    gap: "20px",
                    width: "100%",
                    marginTop: "20px"
                  }}
                >
                  {selectedOption === "membership" ? (
                    <Select
                      value={membership}
                      onChange={handleMembershipChange}
                      fullWidth
                      displayEmpty
                      sx={{
                        width: { xs: "100%", sm: "500px" }, // Adjusts width for small screens
                        padding: "10px",
                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        fontSize: "16px",
                        transition: "box-shadow 0.3s ease, transform 0.2s ease",
                        "&:hover": {
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                          transform: "scale(1.03)",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Membership
                      </MenuItem>
                      <MenuItem value="daily">Daily</MenuItem>
                      <MenuItem value="weekly">Weekly</MenuItem>
                      <MenuItem value="monthly">Monthly</MenuItem>
                    </Select>
                  ) : selectedOption === "feeStatus" ? (
                    <Select
                      value={feeStatus}
                      onChange={handleFeeStatusChange}
                      fullWidth
                      displayEmpty
                      sx={{
                        width: { xs: "100%", sm: "500px" },
                        padding: "10px",
                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        fontSize: "16px",
                        transition: "box-shadow 0.3s ease, transform 0.2s ease",
                        "&:hover": {
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                          transform: "scale(1.03)",
                        },
                      }}
                    >
                      <MenuItem value="" disabled>
                        Select Fee Status
                      </MenuItem>
                      <MenuItem value="paid">Paid</MenuItem>
                      <MenuItem value="unpaid">Unpaid</MenuItem>
                    </Select>
                  ) : (
                    <MDInput
                      label={`Search by ${selectedOption}`}
                      fullWidth
                      value={searchQuery}
                      onChange={handleSearchChange}
                      sx={{
                        width: { xs: "100%", sm: "500px" },
                        padding: "10px",
                        boxShadow: "0px 8px 15px rgba(0, 0, 0, 0.2)",
                        borderRadius: "8px",
                        fontSize: "16px",
                        transition: "box-shadow 0.3s ease, transform 0.2s ease",
                        "&:hover": {
                          boxShadow: "0px 10px 20px rgba(0, 0, 0, 0.25)",
                          transform: "scale(1.03)",
                        },
                      }}
                    />
                  )}
                  {/* Search Button */}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleSearch}
                    sx={{
                      height: "56px",
                      padding: "10px 20px",
                      fontSize: "16px",
                      transition: "background-color 0.3s ease",
                      backgroundColor: "#3f51b5", // Default background color
                      "&:hover": {
                        backgroundColor: "#1976d2", // Hover background color
                      },
                    }}
                  >
                    Search
                  </Button>
                </MDBox>
              </MDBox>
              <MDBox mb={2}>
                {/* Responsive Radio Buttons */}
                <RadioGroup
                  value={selectedOption}
                  onChange={handleOptionChange}
                  row
                  sx={{
                    justifyContent: { xs: "center", sm: "center" }, // Responsive alignment
                    flexWrap: { xs: "wrap", sm: "nowrap" }, // Adjust layout for smaller screens
                  }}
                >
                  <FormControlLabel
                    value="name"
                    control={<Radio />}
                    label="Name"
                  />
                  <FormControlLabel
                    value="phone"
                    control={<Radio />}
                    label="Phone Number"
                  />
                  <FormControlLabel
                    value="membership"
                    control={<Radio />}
                    label="Membership"
                  />
                  <FormControlLabel
                    value="feeStatus"
                    control={<Radio />}
                    label="Fee Status"
                  />
                </RadioGroup>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
          <Grid item xs={12}>
            <Card>
              <MDBox
                mx={2}
                mt={-3}
                py={3}
                px={2}
                variant="gradient"
                bgColor="info"
                borderRadius="lg"
                coloredShadow="info"
              >
                <MDTypography variant="h6" color="white">
                  Projects Table
                </MDTypography>
              </MDBox>
              <MDBox pt={3}>
                <DataTable
                  table={{ columns: pColumns, rows: pRows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Tables;
