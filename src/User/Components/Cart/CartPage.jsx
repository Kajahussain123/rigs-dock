import React, { useState, useEffect } from "react";
import { Box, Button, CardMedia, Container, Divider, Grid, Typography, IconButton, TextField, Dialog, DialogTitle, DialogActions } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { removeCart, viewCart, applyCoupon, removeCoupon, checkout, updateCartQuantity } from "../../../Services/allApi";
import { useNavigate } from "react-router-dom";
import placeholder from "../../../Assets/PlacHolder.png"

const CartPage = () => {
  const [cart, setCart] = useState({ items: [], totalPrice: 0, deliveryFee: 0, platformFee: 0, appliedCoupon: {} });
  const [couponCode, setCouponCode] = useState("");
  const [couponApplied, setCouponApplied] = useState(false);
  const [couponError, setCouponError] = useState("");
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const BASE_URL = "http://localhost:3006/uploads/";
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await viewCart(userId);
        if (response.cart) {
          // Calculate total delivery fee
          const totalDeliveryFee = response.cart.items.reduce((sum, item) => sum + (item.product.deliveryfee || 0), 0);

          setCart({
            items: response.cart.items.map((item) => ({
              id: item.product._id,
              name: item.product.name,
              price: item.product.finalPrice || item.product.price,
              quantity: item.quantity,
              totalPrice: item.quantity * (item.product.finalPrice || item.product.price),
              brand: item.product.brand,

              deliveryFee: item.product.deliveryfee || 0, // Get individual delivery fee
              image: item.product.images?.[0] ? `${BASE_URL}${item.product.images[0]}` : "https://via.placeholder.com/120",
            })),
            totalPrice: response.cart.totalPrice,
            platformFee: response.platformFee || 0,
            deliveryFee: totalDeliveryFee, // Store total delivery fee
            appliedCoupon: response.cart.coupon || {}, // Store applied coupon
          });

          // Set couponApplied and couponCode if a coupon is applied
          if (response.cart.coupon && response.cart.coupon.code) {
            setCouponApplied(true);
            setCouponCode(response.cart.coupon.code);
          }
        }
      } catch (error) {
        console.error("Error fetching cart:", error);
      }
    };

    if (userId) fetchCart();
  }, [userId]);

  const handleApplyCoupon = async () => {
    try {
      const response = await applyCoupon(userId, couponCode);
      if (response.cart) {
        setCart({
          ...cart,
          totalPrice: response.cart.totalPrice,
          appliedCoupon: response.cart.coupon || {},
        });
        setCouponApplied(true);
        setCouponError("");
      }
    } catch (error) {
      setCouponApplied(false);
      setCouponError("Invalid coupon code. Try again!");
    }
  };

  const handleRemoveCoupon = async () => {
    try {
      const response = await removeCoupon(userId);
      if (response.cart) {
        setCart({
          ...cart,
          totalPrice: response.cart.totalPrice,
          appliedCoupon: {},
        });
        setCouponApplied(false);
        setCouponError("");
        setCouponCode("");
      }
    } catch (error) {
      console.error("Failed to remove coupon", error);
    }
  };

  // Open Confirmation Modal
  const handleRemoveClick = (product) => {
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  // Confirm Removal
  const confirmRemove = async () => {
    if (!selectedProduct) return;

    try {
      await removeCart(userId, selectedProduct.id);
      setCart({
        ...cart,
        items: cart.items.filter((item) => item.id !== selectedProduct.id),
        totalPrice: cart.totalPrice - selectedProduct.totalPrice,
      });
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setOpenDialog(false);
      setSelectedProduct(null);
    }
  };

  const handleCheckout = async () => {
    try {
      await checkout(userId); // Call the separate API function
      navigate("/checkout"); // Redirect to checkout page on success
    } catch (error) {
      console.error("Checkout failed", error);
    }
  };

  const handleQuantityChange = async (productId, action) => {
    try {
      const response = await updateCartQuantity(userId, productId, action);
      console.log("API Response:", JSON.stringify(response, null, 2)); // Debugging log

      if (response.cart) {
        if (Array.isArray(response.cart.items)) {
          // Merge updated items with existing cart items to retain product details
          const updatedItems = response.cart.items.map((item) => {
            // Find the corresponding item in the existing cart
            const existingItem = cart.items.find((i) => i.id === item.product);

            // Use existing product details if available
            const product = existingItem
              ? {
                name: existingItem.name,
                brand: existingItem.brand,
                images: existingItem.images,
                deliveryfee: existingItem.deliveryFee,
                finalPrice: existingItem.price,
                price: existingItem.price,
              }
              : {};

            const price = product.finalPrice || product.price || 0; // Fallback to 0 if price is missing
            const totalPrice = item.quantity * price;

            return {
              id: item.product, // Use the product ID from the API response
              name: product.name || "Unknown Product", // Fallback for missing name
              price: price,
              quantity: item.quantity,
              totalPrice: totalPrice,
              brand: product.brand || "Unknown Brand", // Fallback for missing brand
              deliveryFee: product.deliveryfee || 0,
              image: product.images?.[0] ? `${BASE_URL}${product.images[0]}` : placeholder,
            };
          });

          const totalDeliveryFee = updatedItems.reduce((sum, item) => sum + item.deliveryFee, 0);

          setCart({
            items: updatedItems,
            totalPrice: response.cart.totalPrice,
            platformFee: response.platformFee || 0,
            deliveryFee: totalDeliveryFee,
            appliedCoupon: response.cart.coupon || {},
          });

          console.log("Updated Cart State:", { updatedItems, totalDeliveryFee }); // Debugging log
        } else {
          console.error("Invalid response: cart.items is not an array.");
        }
      }
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif`, mb: 2 }}>
        <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif`, }}>Shopping</Box>Cart
      </Typography>

      <Grid container spacing={3}>
        {/* Left Side - Cart Items */}
        <Grid item xs={12} md={8}>
          {cart.items.length > 0 ? (
            cart.items.map((item) => (
              <Box
                key={item.id} // Ensure the key is unique
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: 2,
                  p: 2,
                  borderRadius: 2,
                  boxShadow: 2,
                  bgcolor: "white",
                }}
              >
                <CardMedia
                  component="img"
                  sx={{ width: 120, height: 120, objectFit: "contain", borderRadius: 1, mr: 2 }}
                  image={placeholder}
                  alt={item.name}
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="subtitle1" fontWeight="bold" gutterBottom>
                    {item.name}
                  </Typography>
                  <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="body2" color="text.secondary">
                    {item.brand}
                  </Typography>
                  <Box sx={{ display: "flex", alignItems: "center" }}>
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="h6" component="span" fontWeight="bold">
                      ₹{item.price?.toLocaleString() || 0} {/* Fallback to 0 if price is missing */}
                    </Typography>
                    <Box sx={{ display: "flex", alignItems: "center", ml: 2 }}>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.id, "decrease")}
                        disabled={item.quantity <= 1}
                        sx={{ minWidth: 30, p: 0.5 }}
                      >
                        -
                      </Button>
                      <Typography sx={{ mx: 2 }}>{item.quantity}</Typography>
                      <Button
                        variant="outlined"
                        onClick={() => handleQuantityChange(item.id, "increase")}
                        sx={{ minWidth: 30, p: 0.5 }}
                      >
                        +
                      </Button>
                    </Box>
                    <Typography
                      variant="body2"
                      sx={{ fontFamily: `"Montserrat", sans-serif`, color: "#388e3c", fontWeight: "bold", ml: 2 }}
                    >
                      ₹{item.totalPrice?.toLocaleString() || 0} {/* Fallback to 0 if totalPrice is missing */}
                    </Typography>
                  </Box>
                </Box>
                <IconButton color="error" onClick={() => handleRemoveClick(item)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ))
          ) : (
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <CardMedia
                component="img"
                sx={{ width: 200, margin: "auto" }}
                image="https://cdn-icons-png.flaticon.com/512/2038/2038854.png"
                alt="Empty Cart"
              />
              <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, mt: 2 }}>
                Your cart is empty.
              </Typography>
              <Typography variant="body2" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "text.secondary", mb: 2 }}>
                Looks like you haven’t added anything yet.
              </Typography>
              <Button
                variant="contained"
                sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", bgcolor: "#0A5FBF" }}
                onClick={() => navigate("/")}
              >
                Start Shopping
              </Button>
            </Box>
          )}
        </Grid>


        {/* Right Side - Price Details */}
        <Grid item xs={12} md={4}>
          <Box sx={{ p: 3, borderRadius: 2, boxShadow: 2, bgcolor: "white" }}>
            <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "text.secondary", mb: 2, fontWeight: "bold" }}>
              PRICE DETAILS
            </Typography>

            {/* Coupon Input */}
            <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
              <TextField
                label="Enter Coupon Code"
                variant="outlined"
                size="small"
                fullWidth
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value)}
                sx={{ mr: 1 }}
                error={couponError.length > 0}
                helperText={couponError}
              />
              <Button
                variant="contained"
                onClick={handleApplyCoupon}
                sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", fontWeight: "bold", bgcolor: "green" }}
              >
                Apply
              </Button>
            </Box>

            {couponApplied && (
              <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <Typography variant="body1" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "#388e3c", fontWeight: "bold" }}>
                  Coupon Applied! ₹{cart.appliedCoupon.discountAmount} Discount
                </Typography>
                <Button
                  variant="outlined"
                  color="error"
                  onClick={handleRemoveCoupon}
                  sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", fontWeight: "bold" }}
                >
                  Remove
                </Button>
              </Box>
            )}

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Total Price</Typography>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">₹{cart.totalPrice.toLocaleString()}</Typography>
            </Box>

            <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Platform Fee</Typography>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">₹{cart.platformFee.toLocaleString()}</Typography>
            </Box>

            <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Discount</Typography>
              <Typography variant="body1" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "#388e3c" }}>
                − ₹{cart.appliedCoupon.discountAmount || 0}
              </Typography>
            </Box>

            <Box sx={{ mb: 1, display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body1">Delivery Charges</Typography>
              {cart.deliveryFee > 0 ? (
                <Typography variant="body1" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "#d32f2f" }}>
                  ₹{cart.deliveryFee}
                </Typography>
              ) : (
                <Typography variant="body1" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "#388e3c" }}>
                  Free
                </Typography>
              )}
            </Box>

            <Divider sx={{ my: 2 }} />

            <Box sx={{ mb: 2, display: "flex", justifyContent: "space-between" }}>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="h6" fontWeight="bold">Total Amount</Typography>
              <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="h6" fontWeight="bold">
                ₹{(cart.totalPrice - (cart.appliedCoupon.discountAmount || 0) + cart.deliveryFee).toLocaleString()}
              </Typography>
            </Box>

            <Button
              variant="contained"
              fullWidth
              onClick={handleCheckout}
              sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", bgcolor: "#0A5FBF", borderRadius: 2, py: 1.5, fontSize: "16px", fontWeight: "bold" }}
            >
              Checkout
            </Button>
          </Box>
        </Grid>
      </Grid>
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: `"Montserrat", sans-serif`, }}>Are you sure you want to remove this item from your cart?</DialogTitle>
        <DialogActions>
          <Button sx={{ fontFamily: `"Montserrat", sans-serif`, }} onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button sx={{ fontFamily: `"Montserrat", sans-serif`, }} onClick={confirmRemove} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default CartPage;