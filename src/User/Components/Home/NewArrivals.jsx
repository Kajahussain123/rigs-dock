import React, { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box, Snackbar } from "@mui/material";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { addToCart, getLatestProducts } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png"
import LoginModal from "../LoginModel";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [timeLeft, setTimeLeft] = useState({ hours: 0, minutes: 0, seconds: 0 });
  const BASE_URL = "https://rigsdock.com/uploads/";
  const [successMessage, setSuccessMessage] = useState(""); // State for Snackbar
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const latestProducts = await getLatestProducts();
        setProducts(latestProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Prevent card click navigation
    const userId = localStorage.getItem("userId"); // Retrieve userId from local storage
    if (!userId) {
      openLoginModal(); // Show the login modal when user is not logged in
      return;
    }

    try {
      await addToCart(userId, productId, 1);
      setSuccessMessage("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart", error);
      alert("Failed to add product to cart. Try again.");
    }
  };

  // Countdown Timer (Fixed 24-Hour Sale Timer)
  useEffect(() => {
    const saleEndTime = new Date();
    saleEndTime.setHours(saleEndTime.getHours() + 24); // Sale ends in 24 hours

    const updateTimer = () => {
      const now = new Date();
      const difference = saleEndTime - now;

      if (difference <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
        return;
      }

      const hours = Math.floor(difference / (1000 * 60 * 60));
      const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
      const seconds = Math.floor((difference % (1000 * 60)) / 1000);

      setTimeLeft({ hours, minutes, seconds });
    };

    const timer = setInterval(updateTimer, 1000);
    return () => clearInterval(timer); // Cleanup
  }, []);

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 3, alignItems: "center" }}>
        <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
          <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif`, }}>New</Box> Arrivals
        </Typography>
        
      </Box>

      {/* Product List */}
      <Grid container spacing={2} justifyContent="center">
        {products.map((product) => (
          <Grid item xs={6} sm={6} md={4} lg={2} key={product._id}> {/* Change xs to 6 for two products per row */}
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",
                p: 2,
                borderRadius: 2,
                boxShadow: 3,
                cursor: "pointer", // Add pointer cursor
              }}
              onClick={() => navigate(`/single/${product._id}`)} // Navigate to single product page
            >
              <Typography variant="caption" color="text.secondary" sx={{ mb: 1, fontFamily: `"Montserrat", sans-serif`, }}>
                {product.brand}
              </Typography>
              <Typography
                variant="subtitle2"
                sx={{
                  height: "40px",
                  overflow: "hidden",
                  display: "-webkit-box",
                  WebkitLineClamp: 2,
                  WebkitBoxOrient: "vertical",
                  mb: 1,
                  fontFamily: `"Montserrat", sans-serif`,
                }}
              >
                {product.name}
              </Typography>

              <CardMedia
                component="img"
                height="140"
                image={product.images?.[0] ? `${BASE_URL}${product.images[0]}` : placeholder} 
                // image={placeholder}
                alt={product.name}
                sx={{ objectFit: "contain", backgroundColor: "#f5f5f5" }}
              />

              <Typography sx={{ mb: 1 }}>
                <Typography
                  component="span"
                  sx={{
                    textDecoration: "line-through",
                    color: "text.secondary",
                    mr: 1,
                    fontFamily: `"Montserrat", sans-serif`,
                  }}
                >
                  ₹ {product.price}
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} component="span" color="primary" fontWeight="bold">
                ₹ {product.finalPrice}
                </Typography>
              </Typography>

              {/* Add to Cart Button */}
              <Button
                onClick={(e) => handleAddToCart(e, product._id)}
                variant="contained"
                fullWidth
                sx={{ mt: "auto", textTransform: "none", fontFamily: `"Montserrat", sans-serif`, }}
              >
                Add to cart
              </Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isLoginOpen && <LoginModal show={isLoginOpen} handleClose={closeLoginModal} />}


      {/* Snackbar for Success Message */}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Box>
  );
};

export default NewArrivals;
