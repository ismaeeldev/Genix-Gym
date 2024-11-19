import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// Define the Author component
const Author = ({ name }) => (
  <MDBox display="flex" alignItems="center" lineHeight={1}>
    <MDTypography display="block" variant="button" fontWeight="medium">
      {name}
    </MDTypography>
  </MDBox>
);

// Define PropTypes for Author component
Author.propTypes = {
  name: PropTypes.string.isRequired,
};

// Define the Phone component
const Phone = ({ phone }) => (
  <MDTypography variant="caption" fontWeight="medium" color="text">
    {phone}
  </MDTypography>
);

// Define PropTypes for Phone component
Phone.propTypes = {
  phone: PropTypes.string.isRequired,
};

// Define the Membership component
const Membership = ({ type }) => (
  <MDBox lineHeight={1} textAlign="left">
    <MDTypography
      display="block"
      variant="caption"
      color="text"
      fontWeight="medium"
    >
      {type}
    </MDTypography>
  </MDBox>
);

// Define PropTypes for Membership component
Membership.propTypes = {
  type: PropTypes.string.isRequired,
};

// Function that returns table data
export default function data() {

  const [userData, setUserData] = useState([]); // Initial state as an empty array
  // const [loading, setLoading] = useState(true);

  useEffect(() => {
    const jwtToken = Cookies.get("jwtToken"); // Get JWT token from cookies

    // Fetch data from API
    async function fetchUserData() {
      try {
        const response = await fetch("http://localhost:8080/api/member/all-members", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${jwtToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data.members); // Set the members data
      } catch (error) {
        console.error("Failed to fetch user data:", error);
        alert("Failed to fetch data. Please try again.");
      }
    }

    fetchUserData();
  }, []);

  function formatDateOnly(dateString) {
    const date = new Date(dateString); // Convert the string into a Date object
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    };

    // Return the formatted date string (without the time)
    return date.toLocaleDateString('en-US', options);
  }

  // Dynamically generate rows for the DataTable
  const rows = userData.map((user) => ({
    author: <Author name={user.name} />,
    phone: <Phone phone={user.phone} />,
    membership: <Membership type={user.membership_type} />,
    status: (
      <MDBox ml={-1}>
        <MDBadge
          badgeContent={user.feeStatus}
          color={user.feeStatus === "Paid" ? "success" : "error"}
          variant="gradient"
          size="sm"
        />
      </MDBox>
    ),
    joiningDate: (
      <MDTypography
        component="a"
        href="#"
        variant="caption"
        color="text"
        fontWeight="medium"
      >
        {formatDateOnly(user.register_date)}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="space-around">
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          Edit
        </MDTypography>
        &nbsp; &nbsp; &nbsp;
        <MDTypography
          component="a"
          href="#"
          variant="caption"
          color="text"
          fontWeight="medium"
        >
          View
        </MDTypography>
      </MDBox>
    ),
  }));

  // Return the columns and dynamically generated rows
  return {
    columns: [
      {
        Header: (
          <MDTypography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Name
          </MDTypography>
        ),
        accessor: "author",
        width: "30%",
        align: "left",
      },
      {
        Header: (
          <MDTypography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Phone Number
          </MDTypography>
        ),
        accessor: "phone",
        align: "left",
      },
      {
        Header: (
          <MDTypography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Membership
          </MDTypography>
        ),
        accessor: "membership",
        align: "left",
      },
      {
        Header: (
          <MDTypography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Fee Status
          </MDTypography>
        ),
        accessor: "status",
        align: "center",
      },
      {
        Header: (
          <MDTypography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Joining Date
          </MDTypography>
        ),
        accessor: "joiningDate",
        align: "center",
      },
      {
        Header: (
          <MDTypography
            variant="h6"
            fontWeight="bold"
            textTransform="capitalize"
          >
            Action
          </MDTypography>
        ),
        accessor: "action",
        align: "center",
      },
    ],
    rows: rows, // Dynamically populated rows
  };
}
