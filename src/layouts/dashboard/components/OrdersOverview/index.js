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
import Card from "@mui/material/Card";
import Icon from "@mui/material/Icon";

// Material Dashboard 2 React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import Cookies from "js-cookie";

// Material Dashboard 2 React example components
import TimelineItem from "examples/Timeline/TimelineItem";
import { useEffect, useState } from "react";
import NotificationsActiveIcon from '@mui/icons-material/NotificationsActive';
// import data from "../Projects/data";
import { useNavigate } from "react-router-dom";





function OrdersOverview() {

  const jwtToken = Cookies.get("jwtToken");
  const [FeeStatus, setFeeStatus] = useState({});
  const navigate = useNavigate();


  const upcomingFee = async () => {
    try {
      const response = await fetch('http://localhost:8080/api/member/dashboard/upcoming-fee', {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${jwtToken}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const responseData = await response.text();
        console.log(responseData)

        Cookies.remove("jwtToken");
        return;
      }

      const data = await response.json();
      setFeeStatus(data);

    } catch (err) {
      console.error("Error:", err);

    }
  };

  useEffect(() => {
    upcomingFee();
  }, [])


  return (
    <Card sx={{ height: "100%" }}>
      <MDBox pt={3} px={3}>
        <MDTypography variant="h6" fontWeight="medium">
          Overview
        </MDTypography>

      </MDBox>
      <MDBox p={2}>
        <TimelineItem
          color="success"
          icon="notifications"
          title={String(FeeStatus.upcoming1to2days)}
          dateTime="Upcoming 1-2 Days"
        />
        <TimelineItem
          color="success"
          icon="notifications"
          title={String(FeeStatus.upcoming3to4days)}
          dateTime="Upcoming 3-4 Days"
        />
        <TimelineItem
          color="warning"
          icon="payment"
          title={String(FeeStatus.willbeunpaidtoday)}
          dateTime="Unpaid Today"
        />
        <TimelineItem
          color="error"
          icon={<NotificationsActiveIcon />}
          title={String(FeeStatus.unpaid1to3days)}
          dateTime="Unpaid 1-3 Days"
        />
        <TimelineItem
          color="error"
          icon={<NotificationsActiveIcon />}
          title={String(FeeStatus.unpaid4to7days)}
          dateTime="Unpaid 4-7 Days"
        />
      </MDBox>

    </Card>
  );
}

export default OrdersOverview;
