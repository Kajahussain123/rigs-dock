import React, { useEffect, useState } from "react";
import { Box, Typography, Paper, Grid, CardMedia, Button } from "@mui/material";
import { LocalShipping, Replay, Visibility } from "@mui/icons-material";
import StarIcon from '@mui/icons-material/Star';
import { useNavigate } from "react-router-dom";  // ✅ Import useNavigate
import { userOrders } from "../../../Services/allApi";
import placeholder from '../../../Assets/PlacHolder.png';

const MyOrders = () => {
  const [orders, setOrders] = useState([]);
  const BASE_URL = "https://rigsdock.com/uploads/";
  const userId = localStorage.getItem("userId");
  const navigate = useNavigate();  // ✅ Initialize navigate

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userOrders(userId);
        setOrders(response.orders);
      } catch (error) {
        console.error("Failed to fetch orders", error);
      }
    };

    if (userId) {
      fetchOrders();
    }
  }, [userId]);

  const handleReturnOrder = (orderId, productId) => {
    navigate(`/profile/return/${orderId}/${productId}`);  // ✅ Navigate with order ID in URL
  };

  const handleViewOrder = (orderId) => {
    navigate(`/profile/order-details/${orderId}`);  // ✅ Navigate with order ID in URL
  };

  const handleAddRating = (productId) => {
    navigate(`/profile/addReview/${productId}`); // ✅ Pass productId instead of orderId
  };


  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" mb={2}>
        My Orders ({orders.length})
      </Typography>

      {orders.map((order) => (
        <Box
          key={order._id}
          sx={{
            display: "flex",
            flexDirection: "column",
            py: 2,
            borderBottom: "1px solid #e0e0e0",
          }}
        >
          {order.items.map((item) => (
            <Grid container spacing={2} key={item._id}>
              <Grid item xs={3} sm={2}>
                <CardMedia
                  component="img"
                  image={`https://rigsdock.com/uploads/${item.product.images?.[0]}`}
                  alt={item.product.name}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "80px",
                    objectFit: "contain",
                  }}
                />
              </Grid>

              <Grid item xs={9} sm={10}>
                <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body1" fontWeight="medium">
                  {item.product.name}
                </Typography>
                <Typography  variant="h6" fontWeight="bold" sx={{fontFamily: `"Montserrat", sans-serif`, mt: 0.5 }}>
                  ₹{item.product.finalPrice.toLocaleString('en-IN')}
                </Typography>
                <Typography variant="body2" color="textSecondary" sx={{fontFamily: `"Montserrat", sans-serif`, mt: 0.5 }}>
                  {order.orderStatus === "Delivered" ? "Delivered on" : "Expected Delivery:"} {order.createdAt}
                </Typography>

                <Box sx={{ display: "flex", mt: 1, gap: 2 }}>
                  <Button
                    variant="text"
                    sx={{fontFamily: `"Montserrat", sans-serif`, color: "#0066cc", fontWeight: "bold", textTransform: "none" }}
                    startIcon={<Visibility />}
                    onClick={() => handleViewOrder(order._id)}  // ✅ Navigate on click
                  >
                    View Order
                  </Button>
                  {order.orderStatus === "Delivered" && (
                    <>
                      <Button
                        variant="text"
                        sx={{fontFamily: `"Montserrat", sans-serif`, color: "#0066cc", fontWeight: "bold", textTransform: "none" }}
                        startIcon={<Replay />}
                        onClick={() => handleReturnOrder(order._id, item.product._id)}  // ✅ Pass correct orderId & productId
                      >
                        Return
                      </Button>

                      <Button
                        variant="text"
                        sx={{fontFamily: `"Montserrat", sans-serif`, color: "#ff9800", fontWeight: "bold", textTransform: "none" }}
                        startIcon={<StarIcon />}
                        onClick={() => handleAddRating(order.items[0].product._id)} // Ensure correct path
                      >
                        Rate & Review Product
                      </Button>

                    </>
                  )}
                  {order.orderStatus === "Shipped" && (
                    <Button
                      variant="text"
                      sx={{fontFamily: `"Montserrat", sans-serif`, color: "green", fontWeight: "bold", textTransform: "none" }}
                      startIcon={<LocalShipping />}
                    >
                      Track Order
                    </Button>
                  )}
                </Box>
              </Grid>
            </Grid>
          ))}
        </Box>
      ))}
    </Paper>
  );
};

export default MyOrders;
