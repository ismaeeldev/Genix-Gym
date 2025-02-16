import React, { useEffect, useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDInput from "components/MDInput";
import MDTypography from "components/MDTypography";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import Footer from "examples/Footer";
import MDButton from "components/MDButton";
// Data
import feeDataTable from "layouts/fee/data/feeDataTable";
import { Pagination } from "@mui/material";
import LoadingBar from 'react-top-loading-bar'



function FeeTable() {

  const [searchForm, setSearchForm] = useState({
    name: "",
    phone: "",
    id: "",
    membershipType: "",
    feeStatus: "",
    gender: "",
  });

  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setSearchForm((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleCancel = () => {
    setSearchForm({
      name: "",
      phone: "",
      id: "",
      membershipType: "",
      feeStatus: "",
      gender: "",
    }
    )

    console.log(searchForm)
  }



  const { columns, rows, handlePages, totalPage, progress, setProgress } = feeDataTable(searchForm);



  return (
    <DashboardLayout>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
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
                  Fee Management
                </MDTypography>
              </MDBox>

              <MDBox
                pt={4}
                pb={3}
                px={{
                  xs: 3, // Small padding for mobile devices
                  sm: 16, // Moderate padding for small devices
                  md: 32, // Larger padding for medium laptops
                  lg: 40, // Optional: Extra padding for larger screens
                }}
                display="flex"
                justifyContent="center"
                alignItems="center"
              >
                <MDBox component="form" role="form" onSubmit={handleSubmit}>
                  <Grid container spacing={3} display={"flex"} justifyContent="center">
                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="text"
                        label="Search by Name"
                        name="name"
                        value={searchForm.name}
                        onChange={handleInputChange}
                        variant="standard"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "200px",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="text"
                        label="Search by Phone Number"
                        name="phone"
                        value={searchForm.phone}
                        onChange={handleInputChange}
                        variant="standard"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "200px",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <MDInput
                        type="text"
                        label="Search by ID"
                        name="id"
                        value={searchForm.id}
                        onChange={handleInputChange}
                        variant="standard"
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "200px",
                          },
                        }}
                      />
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Select
                        onChange={handleInputChange}
                        name="membershipType"
                        value={searchForm.membershipType}
                        displayEmpty
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "200px",
                          },
                          padding: "10px",
                          fontSize: "16px",
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Membership
                        </MenuItem>
                        <MenuItem value="Daily">Daily</MenuItem>
                        <MenuItem value="Monthly">Monthly</MenuItem>
                        <MenuItem value="Yearly">Yearly</MenuItem>
                      </Select>
                    </Grid>


                    <Grid item xs={12} sm={6}>
                      <Select
                        value={searchForm.feeStatus}
                        onChange={handleInputChange}
                        name="feeStatus"
                        displayEmpty
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "200px",
                          },
                          padding: "10px",
                          fontSize: "16px",
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Fee Status
                        </MenuItem>
                        <MenuItem value="Paid">Paid</MenuItem>
                        <MenuItem value="Unpaid">Unpaid</MenuItem>
                      </Select>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      <Select
                        value={searchForm.gender}
                        onChange={handleInputChange}
                        name="gender"
                        displayEmpty
                        sx={{
                          width: {
                            xs: "100%",
                            sm: "200px",
                          },
                          padding: "10px",
                          fontSize: "16px",
                        }}
                      >
                        <MenuItem value="" disabled>
                          Select Gender
                        </MenuItem>
                        <MenuItem value="Male">Male</MenuItem>
                        <MenuItem value="Female">Female</MenuItem>
                      </Select>
                    </Grid>

                  </Grid>
                </MDBox>
              </MDBox>


              <Grid container justifyContent="center" mt={4}>
                <Grid
                  item
                  xs={12}
                  sm={6}
                  md={4}
                  display="flex"
                  justifyContent="center"
                  gap={2} // Adds spacing between buttons
                  flexDirection={{
                    xs: "column", // Stacks buttons vertically on small screens
                    sm: "row", // Aligns buttons horizontally on larger screens
                  }}
                >
                  <MDButton
                    type="button"
                    variant="gradient"
                    color="error"
                    onClick={handleCancel}
                    sx={{
                      width: {
                        xs: "100%", // Full-width button on small screens
                        sm: "auto", // Auto-width button on larger screens
                      },
                    }}
                  >
                    Cancel
                  </MDButton>

                  <MDButton
                    type="button"
                    // onClick={handleSubmit}
                    variant="gradient"
                    color="info"
                    sx={{
                      width: {
                        xs: "100%", // Full-width button on small screens
                        sm: "auto", // Auto-width button on larger screens
                      },
                    }}
                  >
                    Search
                  </MDButton>
                </Grid>
              </Grid>


              <MDBox pt={3} mt={8}>
                <DataTable
                  table={{ columns, rows }}
                  isSorted={false}
                  entriesPerPage={false}
                  showTotalEntries={false}
                  noEndBorder
                />
                <div style={{ color: "white", display: 'flex', justifyContent: 'center', marginTop: '40px', marginBottom: "30px" }}>
                  <Pagination variant="outlined" defaultPage={1} count={totalPage} color="secondary" onChange={handlePages} />
                </div>

              </MDBox>
            </Card>
          </Grid>
        </Grid>
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}



export default FeeTable;

