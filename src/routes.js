import { lazy, Suspense } from "react";
import Icon from "@mui/material/Icon";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// Lazy-loaded components for better performance
const Dashboard = lazy(() => import("layouts/dashboard"));
const Profile = lazy(() => import("layouts/profile"));
const SignIn = lazy(() => import("layouts/authentication/sign-in"));
const Register = lazy(() => import("layouts/register"));
const UserTable = lazy(() => import("layouts/tables"));
const FeeTable = lazy(() => import("layouts/fee"));
const UserHistory = lazy(() => import("components/UserHistory"));
const Loader = lazy(() => import("components/Loader"));
const MemberProfile = lazy(() => import("layouts/Member"));
const UserProfile = lazy(() => import("layouts/User"));

const LoaderFallback = () => (
  <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", width: "100vw", height: "100vh" }}>
    <CircularProgress size={60} />
  </Box>
);

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <Dashboard />
      </Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Member Data",
    key: "tables",
    icon: <Icon fontSize="small">table_view</Icon>,
    route: "/member-data",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <UserTable />
      </Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Fee Management",
    key: "fee-management",
    icon: <Icon fontSize="small">receipt_long</Icon>,
    route: "/fee-management",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <FeeTable />
      </Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Registration",
    key: "registration",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/register",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <Register />
      </Suspense>
    ),
  },
  {
    type: "collapse",
    name: "Contact Us",
    key: "contact",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/contact",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <Profile />
      </Suspense>
    ),
  },
  {
    key: "sign-in",
    route: "/authentication/sign-in",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <SignIn />
      </Suspense>
    ),
  },
  {
    route: "/payment-history",
    key: "payment-history",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <UserHistory />
      </Suspense>
    ),
  },
  {
    route: "/Loader",
    key: "loader",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <Loader />
      </Suspense>
    ),
  },
  {
    key: "memberProfile",
    route: "/memberProfile",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <MemberProfile />
      </Suspense>
    ),
  },
  {
    key: "userProfile",
    route: "/userProfile",
    name: "userProfile",
    component: (
      <Suspense fallback={<LoaderFallback />}>
        <UserProfile />
      </Suspense>
    ),
  },
];

export default routes;
