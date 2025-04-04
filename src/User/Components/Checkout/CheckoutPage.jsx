import React, { useEffect, useState } from 'react';
import {
  Typography, Container, Grid, Paper, Radio, RadioGroup, FormControl, FormControlLabel, Button, Card, CardMedia, CardContent, Box,
  Divider, useMediaQuery, useTheme, Chip, CircularProgress,
} from '@mui/material';
import { useNavigate } from 'react-router-dom'; // For redirection
import { confirmOrder, userAddressView, viewCheckout } from '../../../Services/allApi';
import placeholder from '../../../Assets/PlacHolder.png'

const CheckoutPage = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const navigate = useNavigate(); // Hook for navigation
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState(null);
  const [paymentMethod, setPaymentMethod] = useState('COD'); // Track payment method
  const [loading, setLoading] = useState(true);
  const [checkoutData, setCheckoutData] = useState(null);
  const userId = localStorage.getItem("userId");

  // Fetch user addresses
  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!userId) return;

        const data = await userAddressView(userId);
        setAddresses(data);

        // Set default address if available
        const defaultAddress = data.find((addr) => addr.isDefault);
        setSelectedAddress(defaultAddress ? defaultAddress._id : data[0]?._id);
      } catch (error) {
        console.error("Error fetching user addresses", error);
      } finally {
        setLoading(false);
      }
    };

    fetchAddresses();
  }, [userId]);

  // Fetch checkout data
  useEffect(() => {
    const fetchCheckout = async () => {
      try {
        if (!userId) return;

        const data = await viewCheckout(userId);
        setCheckoutData(data);
      } catch (error) {
        console.error("Error fetching checkout data", error);
      } finally {
        setLoading(false);
      }
    };

    fetchCheckout();
  }, [userId]);

  // Handle address selection
  const handleAddressChange = (event) => {
    setSelectedAddress(event.target.value);
  };

  // Handle payment method selection
  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
  };

  // Redirect to the "Add New Address" page
  const handleAddNewAddress = () => {
    navigate('/profile/address'); // Replace with your route for adding a new address
  };

  // Confirm Order Function
  // const handleConfirmOrder = async () => {
  //   try {
  //     if (!userId || !selectedAddress) {
  //       alert("Please select a shipping address.");
  //       return;
  //     }

  //     const orderData = {
  //       userId,
  //       shippingAddressId: selectedAddress,
  //       paymentMethod,
  //     };

  //     const response = await confirmOrder(orderData); // Use the confirmOrder API
  //     console.log("Order placed successfully:", response);

  //     // Redirect to order confirmation page or show success message
  //     navigate('/order-confirmation'); // Replace with your order confirmation route
  //   } catch (error) {
  //     console.error("Failed to place order", error);
  //     alert("Failed to place order. Please try again.");
  //   }
  // };

  //   const handleConfirmOrder = async () => {
  //     try {
  //         if (!userId || !selectedAddress) {
  //             alert("Please select a shipping address.");
  //             return;
  //         }

  //         const orderData = {
  //             userId,
  //             shippingAddressId: selectedAddress,
  //             paymentMethod,
  //         };

  //         const response = await confirmOrder(orderData);
  //         console.log("Full API Response:", response);

  //         if (paymentMethod === "COD") {
  //             navigate("/order-confirmation");

  //         } else if (paymentMethod === "UPI") {
  //             const paymentUrl = response?.paymentUrl; // No need for response.data.paymentUrl


  //             if (paymentUrl) {
  //                 console.log("Redirecting to:", paymentUrl);
  //                 window.location.href = paymentUrl; // Redirect to payment gateway
  //                 // Alternative if redirection fails: window.open(paymentUrl, "_self");
  //             } else {
  //                 alert("Error: Payment URL not received.");
  //             }
  //         }
  //     } catch (error) {
  //         console.error("Failed to place order", error);
  //         alert("Failed to place order. Please try again.");
  //     }
  // };
  const handleConfirmOrder = async () => {
    try {
      if (!userId || !selectedAddress) {
        alert("Please select a shipping address.");
        return;
      }

      const orderData = {
        userId,
        shippingAddressId: selectedAddress,
        paymentMethod,
      };

      const response = await confirmOrder(orderData);
      console.log("Full API Response:", response);

      if (paymentMethod === "COD") {
        navigate("/order-confirmation");

      } else if (paymentMethod === "PhonePe") {  // Ensure correct method name
        const paymentUrl = response?.paymentUrl;

        if (paymentUrl) {
          console.log("Redirecting to:", paymentUrl);
          window.location.href = paymentUrl;
        } else {
          alert("Error: Payment URL not received.");
        }
      }
    } catch (error) {
      console.error("Failed to place order", error);
      alert("Failed to place order. Please try again.");
    }
  };




  return (
    <div>
      {/* Main Content */}
      <Container maxWidth="lg" style={{ marginTop: '2rem', marginBottom: '2rem' }}>
        <Grid container spacing={isMobile ? 2 : 3}>
          {/* Left Side - Delivery Information */}
          <Grid item xs={12} md={6}>
            <Paper elevation={2} style={{ padding: isMobile ? '1rem' : '2rem', marginBottom: isMobile ? '1rem' : 0 }}>
              <Typography variant="h6" gutterBottom style={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: 'bold', marginTop: '-0.8rem' }}>
                Delivery Address Information
              </Typography>

              {/* Address Selection (Radio Buttons) */}
              <Box mb={3}>
                {loading ? (
                  <CircularProgress />
                ) : (
                  <RadioGroup
                    aria-label="address"
                    name="address"
                    value={selectedAddress}
                    onChange={handleAddressChange}
                  >
                    {addresses.map((address) => (
                      <Paper
                        key={address._id}
                        elevation={1}
                        sx={{
                          padding: "1rem",
                          marginBottom: "1rem",
                          border: selectedAddress === address._id ? "2px solid #0A5FBF" : "1px solid #ddd",
                          borderRadius: "4px",
                        }}
                      >
                        <FormControlLabel
                          value={address._id}
                          control={<Radio color="primary" />}
                          label={
                            <Box>
                              {/* Address Tag (Home/Office) */}
                              <Chip
                                label={address.addressType}
                                size="small"
                                sx={{
                                  backgroundColor: address.addressType === "Home" ? "#e3f2fd" : "#f5f5f5",
                                  color: address.addressType === "Home" ? "#1976d2" : "#757575",
                                  marginBottom: "0.5rem", fontFamily: `"Montserrat", sans-serif`,
                                }}
                              />
                              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1" fontWeight="bold">
                                {address.fullName}
                              </Typography>
                              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body2">
                                {address.addressLine1}, {address.addressLine2}
                              </Typography>
                              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body2">
                                {address.city}, {address.state}, {address.zipCode}, {address.country}
                              </Typography>
                              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body2">Phone: {address.phone}</Typography>
                            </Box>
                          }
                        />
                      </Paper>
                    ))}
                  </RadioGroup>
                )}
              </Box>
              {/* Add New Address Button */}
              <Button
                variant="outlined"
                fullWidth
                style={{ fontFamily: `"Montserrat", sans-serif`, marginTop: '1rem' }}
                onClick={handleAddNewAddress}
              >
                Add New Address
              </Button>
            </Paper>
          </Grid>

          {/* Right Side - Cart Review */}
          <Grid item xs={12} md={6}>
            {/* Cart Items - Scrollable */}
            <Paper
              elevation={2}
              style={{
                padding: "1rem",
                marginBottom: "1rem",
                backgroundColor: "white",
              }}
            >
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="h6" gutterBottom fontWeight="bold">
                Review Your Cart
              </Typography>

              {/* Show loading spinner while fetching */}
              {loading ? (
                <Box display="flex" justifyContent="center" alignItems="center">
                  <CircularProgress />
                </Box>
              ) : checkoutData?.items.length > 0 ? (
                checkoutData.items.map((item, index) => (
                  <Card
                    key={index}
                    variant="outlined"
                    style={{
                      marginTop: "1rem",
                      marginBottom: "1rem",
                      display: "flex",
                      border: "none",
                      backgroundColor: "transparent",
                    }}
                  >
                    <CardMedia
                      component="img"
                      style={{
                        width: 150,
                        height: 100,
                        objectFit: "contain",
                        maxHeight: "100px",
                      }}
                      image={`https://rigsdock.com/uploads/${item.product.images?.[0]}`}
                      alt={item.product.name}
                    />
                    <CardContent style={{ flex: "1 0 auto", padding: "1rem" }}>
                      <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} component="div" variant="h6">
                        {item.product.name}
                      </Typography>
                      <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="body2" color="text.secondary" gutterBottom>
                        Quantity: {item.quantity}
                      </Typography>
                      <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="h6" style={{ marginTop: "0.5rem" }}>
                        ₹{item.price}
                      </Typography>
                    </CardContent>
                  </Card>
                ))
              ) : (
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="body1" color="text.secondary">
                  No items in the cart.
                </Typography>
              )}
            </Paper>


            {/* Payment Section */}
            <Paper elevation={2} style={{ padding: "2rem", marginTop: "1.5rem" }}>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="h6" gutterBottom fontWeight="bold">
                Payment Summary
              </Typography>

              {/* Subtotal */}
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Subtotal</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">₹{checkoutData?.totalPrice || 0}</Typography>
                </Grid>
              </Grid>

              {/* Shipping Fee (Assumed to be ₹0 for now) */}
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Shipping</Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">₹0</Typography>
                </Grid>
              </Grid>

              {/* Discount (If Coupon Applied) */}
              <Grid container justifyContent="space-between" sx={{ mb: 1 }}>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Discount</Typography>
                </Grid>
                <Grid item>
                  {checkoutData?.appliedCoupon ? (
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1" color="error" fontSize="0.85rem">
                      -₹{checkoutData.appliedCoupon.discountAmount} ({checkoutData.appliedCoupon.code})
                    </Typography>
                  ) : (
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1" color="error" fontSize="0.85rem">
                      *No coupon applied
                    </Typography>
                  )}
                </Grid>
              </Grid>

              <Divider style={{ margin: "1rem 0" }} />

              {/* Total Price After Discount */}
              <Grid container justifyContent="space-between" sx={{ mb: 3 }}>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1" fontWeight="bold">
                    Total
                  </Typography>
                </Grid>
                <Grid item>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="h6" fontWeight="bold">
                    ₹
                    {checkoutData?.totalPrice -
                      (checkoutData?.appliedCoupon?.discountAmount || 0)}
                  </Typography>
                </Grid>
              </Grid>

              {/* Payment Options */}
              <Box mb={3}>
               
                <FormControl component="fieldset">
                  <Box mb={3}>
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="body1" gutterBottom fontWeight="bold">
                      Payment Options
                    </Typography>
                    <FormControl component="fieldset">
                      <RadioGroup
                        aria-label="payment method"
                        name="payment-method"
                        value={paymentMethod}
                        onChange={handlePaymentMethodChange}
                      >
                        <FormControlLabel value="COD" control={<Radio color="primary" />} label="Cash on Delivery" />
                        <FormControlLabel value="PhonePe" control={<Radio color="primary" />} label="PhonePe" />
                        <FormControlLabel value="Credit Card" control={<Radio color="primary" />} label="Pay Online (Cashfree)" />
                      </RadioGroup>
                    </FormControl>
                  </Box>

                </FormControl>
              </Box>

              {/* Confirm Order Button */}
              <Button
                variant="contained"
                fullWidth
                style={{
                  backgroundColor: "#0A5FBF",
                  color: "white",
                  padding: "0.75rem",
                  borderRadius: "4px",
                  fontFamily: `"Montserrat", sans-serif`,
                }}
                onClick={handleConfirmOrder}
              >
                Confirm Order
              </Button>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </div>
  );
};

export default CheckoutPage;