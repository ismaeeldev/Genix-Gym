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

// @mui material components
import Grid from "@mui/material/Grid";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";

// Data
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

// Dashboard components
import Projects from "layouts/dashboard/components/Projects";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";


//

function Dashboard() {
  const navigate = useNavigate();
  const { sales, tasks } = reportsLineChartData;
  // const [cookies] = useCookies(["jwtToken"]);
  // const [message, setMessage] = useState("");
  const jwtToken = Cookies.get("jwtToken");
  const [dashboardData, setDashboardData] = useState({ totalMembers: "", currentMembers: "", membersThisMonth: "", totalTrainers: "" })

  const hello = async () => {

    try {
      const response = await fetch('http://localhost:8080/api/auth/welcome', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      // Check if the response is OK (status 200-299)
      if (!response.ok) {
        const responseData = await response.text(); // Get the error response as text
        alert("Error: " + responseData);
        navigate("/authentication/sign-in");
        Cookies.remove("jwtToken");

        return;
      }

      // Parse and log the successful response as JSON
      const json = await response.text();
    } catch (err) {
      console.error("Error:", err);
      alert("Error: " + err.message);
    }
  };


  const Dashboard = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/member/dashboard/home', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const responseData = await response.text(); // Get the error response as text
        swal({
          title: responseData,
          text: "",
          icon: "error",
          button: "Done",
        });
        navigate("/authentication/sign-in");
        Cookies.remove("jwtToken");
        return;
      }

      const data = await response.json();

      setDashboardData({ totalMembers: data.totalMembers, currentMembers: data.currentMembers, membersThisMonth: data.membersThisMonth, totalTrainers: data.totalTrainers })

    } catch (err) {
      console.error("Error:", err);
      swal({
        title: "Internal Server Error ",
        text: "",
        icon: "error",
        button: "Done",
      });
      navigate("/authentication/sign-in");


    }
  };




  useEffect(() => {

    // setTimeout(() => {
    //   navigate("/Loader")

    // }, 9000);
    // Retrieve the token from cookies
    const jwtToken = Cookies.get("jwtToken");

    // Redirect if the token does not exist
    if (!jwtToken) {
      swal({
        title: "Session Expired",
        text: "",
        icon: "info",
        button: "Done",
      });
      navigate("/authentication/sign-in");
    }
  }, [navigate]);

  useEffect(() => {
    hello();
    Dashboard();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox py={3}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="dark"
                icon="groups"
                title="Total Members"
                count={dashboardData.totalMembers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                icon="store"
                title="Current Members"
                count={dashboardData.currentMembers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="success"
                icon="payment"
                title="Member this month"
                count={dashboardData.membersThisMonth}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color="primary"
                icon="person_add"
                title=" Total Trainers"
                count={dashboardData.totalTrainers}
                percentage={{
                  color: "success",
                  amount: "",
                  label: "Just updated",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>



        <MDBox mt={6}>
          <Grid container spacing={3} alignItems="stretch">
            <Grid item xs={12} md={8} mt={3}>
              {/* 70% Chart Component */}
              <MDBox mb={3}>
                <ReportsLineChart
                  color="success"
                  title="daily sales"
                  description={
                    <>
                      (<strong>+15%</strong>) increase in todays sales.
                    </>
                  }
                  date="updated 4 min ago"
                  chart={sales}
                />
              </MDBox>
            </Grid>

            <Grid item xs={12} md={4}>
              <MDBox mb={3}>
                <OrdersOverview />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>

        {/* <MDBox>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={8}>
              <Projects />
            </Grid>

          </Grid>
        </MDBox> */}
      </MDBox>
      <Footer />
    </DashboardLayout>
  );
}

export default Dashboard;
