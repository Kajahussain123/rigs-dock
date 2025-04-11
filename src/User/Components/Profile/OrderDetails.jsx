import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Button,
  Divider,
  Stepper,
  Step,
  StepLabel,
  StepConnector,
  styled,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate, useParams } from "react-router-dom";
import { orderDetails } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png";

// Custom styled connector for the stepper
const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.MuiStepConnector-root`]: {
    left: 'calc(-50% + 16px)',
    right: 'calc(50% + 16px)',
  },
  [`&.MuiStepConnector-active, &.MuiStepConnector-completed`]: {
    [`& .MuiStepConnector-line`]: {
      borderColor: theme.palette.success.main,
    },
  },
}));

const OrderDetails = () => {
  const { orderId } = useParams();
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const BASE_URL = "https://rigsdock.com/uploads/";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchOrder = async () => {
      try {
        const response = await orderDetails(orderId);
        setOrder(response.order);
      } catch (err) {
        console.error("Error fetching order:", err);
        setError("Failed to load order details.");
      } finally {
        setLoading(false);
      }
    };
    fetchOrder();
  }, [orderId]);

  // Define tracking steps based on order status
  const getTrackingSteps = () => {
    return [
      { label: "Order Placed", status: "placed" },
      { label: "Processing", status: "processing" },
      { label: "Shipped", status: "shipped" },
      { label: "Out for Delivery", status: "outForDelivery" },
      { label: "Delivered", status: "delivered" },
    ];
  };

  // Determine active step based on order status
  const getActiveStep = (orderStatus) => {
    const steps = getTrackingSteps();
    const statusMap = {
      "Placed": 0,
      "Processing": 1,
      "Shipped": 2,
      "Out for Delivery": 3,
      "Delivered": 4,
    };
    return statusMap[orderStatus] || 0;
  };

  if (loading)
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="200px">
        <CircularProgress />
      </Box>
    );
  if (error)
    return (
      <Typography color="error" align="center" sx={{ mt: 4 }}>
        {error}
      </Typography>
    );
  if (!order)
    return (
      <Typography align="center" sx={{ mt: 4 }}>
        No order found.
      </Typography>
    );

  const handleAddRating = (productId) => {
    navigate(`/profile/addReview/${productId}`);
  };

  const handleReturnOrder = (orderId, productId) => {
    navigate(`/profile/return/${orderId}/${productId}`);
  };

  return (
    <Container maxWidth="lg" sx={{ my: 2 }}>
      <Typography variant="h5" fontWeight="bold" sx={{ mb: 4, fontFamily: `"Montserrat", sans-serif` }}>
        Order Details
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section - Order Items and Tracking */}
        <Grid item xs={12} md={8}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: `"Montserrat", sans-serif` }}>
                Order Items
              </Typography>
              {order.items.map((item) => (
                <Box key={item.product._id} display="flex" alignItems="center" gap={2} sx={{ mb: 3 }}>
                  <CardMedia
                    component="img"
                    image={item.product.images.length ? `${BASE_URL}${item.product.images[0]}` : placeholder}
                    alt={item.product.name}
                    sx={{ width: 100, height: 100, objectFit: "contain", borderRadius: 1 }}
                  />
                  <Box flexGrow={1}>
                    <Typography variant="h6" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                      {item.product.name}
                    </Typography>
                    <Typography color="textSecondary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                      Brand: {item.product.brand}
                    </Typography>
                    <Typography variant="h6" color="primary" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                      ₹{item.product.finalPrice.toLocaleString('en-IN')}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
          {/* Tracking Section */}
          <Card elevation={3} sx={{mt:2}}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 3, fontFamily: `"Montserrat", sans-serif` }}>
                Order Tracking
              </Typography>
              <Stepper
                activeStep={getActiveStep(order.orderStatus)}
                orientation="vertical"
                connector={<ColorlibConnector />}
              >
                {getTrackingSteps().map((step, index) => (
                  <Step key={step.label}>
                    <StepLabel
                      sx={{
                        '& .MuiStepLabel-label': {
                          fontFamily: `"Montserrat", sans-serif`,
                          fontWeight: 'bold',
                        },
                      }}
                    >
                      {step.label}
                      {index <= getActiveStep(order.orderStatus) && (
                        <Typography variant="caption" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                          {index === getActiveStep(order.orderStatus) ? `In progress` : `Completed`}
                        </Typography>
                      )}
                    </StepLabel>
                  </Step>
                ))}
              </Stepper>
            </CardContent>
          </Card>

          {/* Order Items Section */}

        </Grid>

        {/* Right Section - Order Summary */}
        <Grid item xs={12} md={4}>
          <Card elevation={3}>
            <CardContent>
              <Typography variant="h6" fontWeight="bold" sx={{ mb: 2, fontFamily: `"Montserrat", sans-serif` }}>
                Order Summary
              </Typography>

              {/* Order Status */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Order Status:
                </Typography>
                <Typography color="green" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  ✔ {order.orderStatus}
                </Typography>
              </Box>

              {/* Payment Status */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Payment Status:
                </Typography>
                <Typography color="green" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  ✔ {order.paymentStatus}
                </Typography>
              </Box>

              {/* Payment Method */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Payment Method:
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>{order.paymentMethod}</Typography>
              </Box>

              {/* Shipping Details */}
              <Box sx={{ mb: 2 }}>
                <Typography variant="body1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Shipping Details:
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  {order.shippingAddress.fullName}
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  {order.shippingAddress.addressLine1}, {order.shippingAddress.city}, {order.shippingAddress.state}
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  {order.shippingAddress.country} - {order.shippingAddress.zipCode}
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Phone: {order.shippingAddress.phone}
                </Typography>
              </Box>

              {/* Price Details */}
              <Box>
                <Typography variant="body1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Price Details:
                </Typography>
                <Box display="flex" justifyContent="space-between" sx={{ mt: 1 }}>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>List Price</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, textDecoration: "line-through" }}>
                    ₹{order.items[0].product.price.toLocaleString('en-IN')}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>Selling Price</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>₹{order.items[0].product.finalPrice.toLocaleString('en-IN')}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>Delivery Fee</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                    {order.items[0].product.deliveryfee ? `₹${order.items[0].product.deliveryfee.toLocaleString('en-IN')}` : "Free"}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>Total Price</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                    ₹{order.totalPrice.toLocaleString('en-IN')}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Return & Review Buttons (only if delivered) */}
      {order.orderStatus === "Delivered" && (
        <Box mt={4} display="flex" justifyContent="end" gap={2}>
          {order.items.map((item) => (
            <Box key={item.product._id} display="flex" gap={2}>
              <Button
                onClick={() => handleReturnOrder(order._id, item.product._id)}
                variant="outlined"
                sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", fontWeight: "bold" }}
              >
                Return Order
              </Button>
              <Button
                onClick={() => handleAddRating(item.product._id)}
                variant="contained"
                color="warning"
                sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", fontWeight: "bold" }}
              >
                Rate & Review Product
              </Button>
            </Box>
          ))}
        </Box>
      )}
    </Container>
  );
};

export default OrderDetails;