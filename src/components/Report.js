import React, { useEffect, useState } from "react";
import {
    Box,
    Card,
    CardContent,
    Typography,
    Grid,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Chip,
    Avatar,
    useTheme
} from "@mui/material";
import { styled } from "@mui/system";
import { FiUser, FiMail, FiPhone, FiCreditCard } from "react-icons/fi";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Cookies from "js-cookie";
import { useLocation } from 'react-router-dom';



const StyledTableRow = styled(TableRow)(({ theme }) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.mode === "dark" ? "#1a1a1a" : "#f5f5f5",
    },
    "&:hover": {
        backgroundColor: theme.palette.mode === "dark" ? "#2a2a2a" : "#eeeeee",
        transition: "background-color 0.3s ease",
    },
}));

const UserReport = (id) => {

    const jwtToken = Cookies.get("jwtToken");
    const location = useLocation();
    const theme = useTheme();
    const [userData, setUserData] = useState({});
    const [paymentHistory, setPaymentHistory] = useState([]);
    const { user } = location.state || {};



    useEffect(() => {

        console.log(user);

        setUserData({
            name: user?.name,
            email: user?.email,
            phone: user?.phone,
            membership_type: user?.membership_type,
        });


        const fetchData = async () => {
            try {
                const response = await fetch(`http://localhost:8080/api/member/history/${user.id}`, {
                    method: "GET",
                    headers: {
                        Authorization: `Bearer ${jwtToken}`,
                        "Content-Type": "application/json",
                    },
                });

                const data = await response.json();

                // Update payment history
                setPaymentHistory(data.map(payment => ({
                    id: payment.id,
                    date: new Date(payment.paymentDate).toLocaleDateString(),  // Ensure valid date format
                    amount: payment.amountPaid,   // Verify this field exists
                    method: payment.paymentMethod || 'N/A',  // Check for undefined fields
                    status: payment.feeStatus,   // Ensure status is provided
                })));


            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };

        fetchData();
    }, [user, id, jwtToken]);

    const getStatusColor = (status) => {
        switch (status) {
            case "Paid":
                return "success";
            case "Pending":
                return "warning";
            default:
                return "default";
        }
    };

    return (
        <DashboardLayout>

            <Box sx={{ p: 3, maxWidth: 1200, margin: "0 auto", bgcolor: theme.palette.mode === "dark" ? "#121212" : "background.default" }}>
                <Grid container spacing={3}>
                    <Grid item xs={12}>
                        <Card
                            elevation={3}
                            sx={{
                                borderRadius: 2,
                                transition: "box-shadow 0.3s ease",
                                bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "background.paper",
                            }}
                        >
                            <CardContent>
                                <Grid container spacing={2} alignItems="center">
                                    <Grid item>
                                        <Avatar
                                            src={`https://${userData.profileImage}`}
                                            alt={userData.name}
                                            sx={{ width: 80, height: 80 }}
                                        />
                                    </Grid>
                                    <Grid item xs={12} sm>
                                        <Typography variant="h5" gutterBottom color="text.primary">
                                            {userData.name}
                                        </Typography>
                                        <Grid container spacing={2}>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <FiMail color={theme.palette.text.primary} />
                                                    <Typography variant="body2" color="text.secondary">{userData.email}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <FiPhone color={theme.palette.text.primary} />
                                                    <Typography variant="body2" color="text.secondary">{userData.phone}</Typography>
                                                </Box>
                                            </Grid>
                                            <Grid item xs={12} sm={6} md={3}>
                                                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                    <FiUser color={theme.palette.text.primary} />
                                                    <Chip
                                                        label={userData.membership_type}
                                                        color="primary"
                                                        size="small"
                                                    />
                                                </Box>
                                            </Grid>
                                        </Grid>
                                    </Grid>
                                </Grid>
                            </CardContent>
                        </Card>
                    </Grid>

                    <Grid item xs={12}>
                        {paymentHistory.length > 0 ? (
                            <Paper
                                elevation={3}
                                sx={{
                                    borderRadius: 2,
                                    overflow: "hidden",
                                    bgcolor: theme.palette.mode === "dark" ? "#1e1e1e" : "background.paper",
                                }}
                                aria-label="Payment history section"
                            >
                                <Typography
                                    variant="h6"
                                    sx={{
                                        p: 2,
                                        bgcolor: theme.palette.mode === "dark" ? "#2a2a2a" : "#f5f5f5",
                                        color: "text.primary"
                                    }}
                                >
                                    Payment History
                                </Typography>
                                <TableContainer>
                                    <Table aria-label="payment history table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell sx={{ color: "text.primary" }}>Date</TableCell>
                                                <TableCell sx={{ color: "text.primary" }}>Amount</TableCell>
                                                <TableCell sx={{ color: "text.primary" }}>Payment Method</TableCell>
                                                <TableCell sx={{ color: "text.primary" }}>Status</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {paymentHistory.map((payment) => (
                                                <StyledTableRow key={payment.id}>
                                                    <TableCell sx={{ color: "text.secondary" }}>{payment.date}</TableCell>
                                                    <TableCell sx={{ color: "text.secondary" }}>RS {payment.amount.toFixed(2)}</TableCell>
                                                    <TableCell sx={{ color: "text.secondary" }}>
                                                        <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                                                            <FiCreditCard color={theme.palette.text.primary} />
                                                            {payment.method}
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell>
                                                        <Chip
                                                            label={payment.status}
                                                            color={getStatusColor(payment.status)}
                                                            size="small"
                                                        />
                                                    </TableCell>
                                                </StyledTableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Paper>
                        ) : (
                            <Typography variant="h6" sx={{ textAlign: "center", p: 3 }}>
                                No Payment History Available
                            </Typography>
                        )}
                    </Grid>

                </Grid>
            </Box>
        </DashboardLayout>
    );
};

export default UserReport;