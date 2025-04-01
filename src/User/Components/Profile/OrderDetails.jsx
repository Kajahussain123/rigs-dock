import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Paper,
  Button,
  Divider,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
} from "@mui/material";
import ReceiptIcon from "@mui/icons-material/Receipt";
import { useNavigate, useParams } from "react-router-dom";
import { orderDetails } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png";

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
    <Container maxWidth="lg" sx={{ my: 4 }}>
      <Typography variant="h4" fontWeight="bold" sx={{ mb: 4, fontFamily: `"Montserrat", sans-serif` }}>
        Order Details
      </Typography>

      <Grid container spacing={4}>
        {/* Left Section - Order Items */}
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
                      ₹{item.product.finalPrice}
                    </Typography>
                  </Box>
                </Box>
              ))}
            </CardContent>
          </Card>
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
                    ₹{order.items[0].product.price}
                  </Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>Selling Price</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>₹{order.items[0].product.finalPrice}</Typography>
                </Box>
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>Delivery Fee</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                    {order.items[0].product.deliveryfee ? `₹${order.items[0].product.deliveryfee}` : "Free"}
                  </Typography>
                </Box>
                <Divider sx={{ my: 1 }} />
                <Box display="flex" justifyContent="space-between">
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }}>Total Price</Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                    ₹{order.totalPrice}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Return & Review Buttons (only if delivered) */}
      {order.orderStatus === "Delivered" && (
        <Box mt={4} display="flex" justifyContent="center" gap={2}>
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