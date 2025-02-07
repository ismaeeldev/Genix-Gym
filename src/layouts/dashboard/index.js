import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import swal from "sweetalert";
import LoadingBar from "react-top-loading-bar";

import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import OrdersOverview from "layouts/dashboard/components/OrdersOverview";

import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";

function Dashboard() {
  const navigate = useNavigate();
  const { sales } = reportsLineChartData;
  const jwtToken = Cookies.get("jwtToken");

  const [progress, setProgress] = useState(0);
  const [dashboardData, setDashboardData] = useState({
    totalMembers: 0,
    currentMembers: 0,
    membersThisMonth: 0,
    totalTrainers: 0,
  });

  const fetchDashboardData = useCallback(async () => {
    if (!jwtToken) return;

    try {
      setProgress(20);
      const response = await fetch("http://localhost:8080/api/member/dashboard/home", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      setProgress(50);
      if (!response.ok) {
        swal({
          title: "Session Expired",
          text: "Please log in again.",
          icon: "info",
          button: "Done",
        }).then(() => {
          Cookies.remove("jwtToken");
          navigate("/authentication/sign-in");
        });
        return;
      }

      const data = await response.json();
      setProgress(80);
      setDashboardData(data);
      setProgress(100);
    } catch (err) {
      console.error("Error:", err);
      swal({
        title: "Internal Server Error",
        text: "Please try again later.",
        icon: "error",
        button: "Done",
      }).then(() => {
        Cookies.remove("jwtToken");
        navigate("/authentication/sign-in");
      });
    }
  }, [jwtToken, navigate]);

  useEffect(() => {
    if (!jwtToken) {
      swal({
        title: "Session Expired",
        text: "Please log in again.",
        icon: "info",
        button: "Done",
      }).then(() => navigate("/authentication/sign-in"));
    } else {
      fetchDashboardData();
    }
  }, [jwtToken, fetchDashboardData, navigate]);


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
