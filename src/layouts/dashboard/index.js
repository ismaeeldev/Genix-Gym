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
import swal from 'sweetalert';
import LoadingBar from 'react-top-loading-bar'




//

function Dashboard() {
  const navigate = useNavigate();
  const { sales, tasks } = reportsLineChartData;
  // const [cookies] = useCookies(["jwtToken"]);
  // const [message, setMessage] = useState("");
  const jwtToken = Cookies.get("jwtToken");
  const [progress, setProgress] = useState(0)


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


  const DashboardData = async () => {
    try {
      setProgress(20)
      const response = await fetch('http://localhost:8080/api/member/dashboard/home', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      setProgress(50)
      if (!response.ok) {
        const responseData = await response.json();

        swal({
          title: "Something went wrong!",
          text: "",
          icon: "error",
          button: "Done",
        }).then(() => {
          // This code runs ONLY after the alert is dismissed
          Cookies.remove("jwtToken");
          navigate("/authentication/sign-in");
        });

        return;
      }


      const data = await response.json();
      setProgress(80)

      setDashboardData({ totalMembers: data.totalMembers, currentMembers: data.currentMembers, membersThisMonth: data.membersThisMonth, totalTrainers: data.totalTrainers })
      setProgress(100);
    } catch (err) {
      console.error("Error:", err);

      // Show alert and navigate only after it closes
      swal({
        title: "Internal Server Error",
        text: "Please try again later.",
        icon: "info",
        button: "Done",
      }).then(() => {
        navigate("/authentication/sign-in");
        Cookies.remove("jwtToken");
      });
    }
  };



  useEffect(() => {
    if (!jwtToken) {
      swal({
        title: "Session Expired",
        text: "Please Log in again",
        icon: "info",
        button: "Done",
      });
      navigate("/authentication/sign-in");
    } else {
      DashboardData(); // Fetch dashboard data
    }
  }, [jwtToken, navigate]);


  useEffect(() => {
    // hello();
    DashboardData();
  }, []);




  return (
    <DashboardLayout>
      <LoadingBar
        color='#f11946'
        progress={progress}
        onLoaderFinished={() => setProgress(0)}
      />
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
