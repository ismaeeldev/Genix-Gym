import PropTypes from "prop-types";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDBadge from "components/MDBadge";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
import UpdateModal from "components/Modal/FeeModal";
import { debounce } from "lodash";
import UserReport from 'components/Report'
import { useNavigate } from "react-router-dom";


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
export default function data(searchForm) {

  const jwtToken = Cookies.get("jwtToken");
  const [userData, setUserData] = useState([]);
  const [page, setPage] = useState(0);
  const [pageSize, setPageSize] = useState(10);
  const [totalPage, setTotalPage] = useState(0);
  const [open, setOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState({});
  const [isHistory, setHistory] = useState(false);
  const navigate = useNavigate();



  const handleHistory = (user) => {
    navigate('/payment-history', { state: { user } })
  }


  const handlePage = (event, value) => {
    const index = value - 1;
    setPage(index);
  };

  const handleOpen = (user) => {
    setSelectedUser(user);
    setOpen(true);
  }


  const handleClose = () => {
    setOpen(false);
    fetchUserData();
  }


  async function fetchUserData() {
    try {
      const baseUrl = "http://localhost:8080/api/member";
      const isSearching = Object.values(searchForm).some(val => val !== "");
      if (isSearching) { setPage(0) }

      const queryParams = new URLSearchParams({
        page,
        size: pageSize,
        ...Object.fromEntries(Object.entries(searchForm).filter(([_, v]) => v !== "")), // Only include non-empty search parameters
      }).toString();

      const url = isSearching
        ? `${baseUrl}/search?${queryParams}`
        : `${baseUrl}/all-members?page=${page}&size=${pageSize}`;

      const response = await fetch(url, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${jwtToken}`,
          "Content-Type": "application/json",
        },
      });

      if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();

      // Check if data.members is an array before setting it
      if (Array.isArray(data.members)) {
        setUserData(data.members);
      } else {
        setUserData([]); // fallback to an empty array if the response is not valid
      }
      setTotalPage(data.totalPages);
    } catch (error) {
      console.error("Failed to fetch user data:", error);
      alert("Failed to fetch data. Please try again.");
      setUserData([]); // fallback to an empty array if fetch fails
    }
  }




  useEffect(() => {

    const debouncedFetchUserData = debounce(() => {
      fetchUserData();
    }, 500);
    debouncedFetchUserData();

    return () => {
      debouncedFetchUserData.cancel();
    };
  }, [page, searchForm]);



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

  // Dynamically generate rows for the DataTable, 
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
        {formatDateOnly(user.registrationDate)}
      </MDTypography>
    ),
    action: (
      <MDBox display="flex" justifyContent="space-around">
        <button
          onClick={() => {
            console.log("Edit clicked of fee");
            handleOpen(user);
          }}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            Pay Fee
          </MDTypography>
        </button>
        <UpdateModal open={open} onClose={handleClose} user={selectedUser} />



        &nbsp; &nbsp; &nbsp;
        <button
          onClick={() => { handleHistory(user) }}
          style={{ background: "transparent", border: "none", cursor: "pointer" }}
        >
          <MDTypography variant="caption" color="text" fontWeight="medium">
            History
          </MDTypography>
        </button>

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
    totalPage: totalPage,
    handlePages: handlePage,




  };
}
