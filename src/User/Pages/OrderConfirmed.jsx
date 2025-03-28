import React from "react";
import { Box, Container, Typography, Paper, Button } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { motion } from "framer-motion";
import Header from "../Components/Header";
import { useNavigate } from "react-router-dom";

const OrderConfirmed = () => {

    const navigaate = useNavigate();

    const handleClick = () => {
        navigaate('/')
    }
return (
    <div>
        <Header></Header>
            <Container sx={{ my: 6, textAlign: "center" }}>
                <Paper elevation={3} sx={{ p: 4, borderRadius: 3, maxWidth: 500, mx: "auto" }}>
                    <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ type: "spring", stiffness: 100 }}
                    >
                        <CheckCircleOutlineIcon sx={{ fontSize: 80, color: "green" }} />
                    </motion.div>
                    <Typography variant="h5" fontWeight="bold" sx={{fontFamily: `"Montserrat", sans-serif`, mt: 2 }}>
                        Order Confirmed!
                    </Typography>
                    <Typography color="textSecondary" sx={{fontFamily: `"Montserrat", sans-serif`, mt: 1 }}>
                        Thank you for your purchase. Your order has been successfully placed.
                    </Typography>
                    <Box mt={3}>
                        <Button variant="outlined" onClick={handleClick} sx={{fontFamily: `"Montserrat", sans-serif`, ml: 2, textTransform: "none" }}>
                            Continue Shopping
                        </Button>
                    </Box>
                </Paper>
            </Container>
        </div>
    );
};

export default OrderConfirmed;