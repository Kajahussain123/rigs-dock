import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Grid, Typography, Button, Box, Card, CardMedia, Chip, Stack, CircularProgress, Snackbar } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";
import { addToCart, addToWishlist, viewProductsById } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png";
import ProductRatings from "./ProductRatings";
import LoginModal from "../LoginModel";

const SingleProductView = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const BASE_URL = "https://rigsdock.com/uploads/";
  const [snackbarAction, setSnackbarAction] = useState(null);
  const [selectedImage, setSelectedImage] = useState("");
  const navigate = useNavigate()


  // Set default image when the product changes
  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(`${BASE_URL}${product.images[0]}`);
    }
  }, [product]);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await viewProductsById(productId);
        setProduct(data.product);
      } catch (error) {
        console.error("Error fetching product data", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openLoginModal();
      return;
    }
    try {
      await addToCart(userId, productId, 1);
      setSuccessMessage("Product added to cart successfully!");
      setSnackbarAction("cart");
    } catch (error) {
      console.error("Error adding product to cart", error);
      alert("Failed to add product to cart. Try again.");
    }
  };

  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openLoginModal();
      return;
    }
    try {
      await addToWishlist(userId, productId);
      setSuccessMessage("Product added to wishlist successfully!");
      setSnackbarAction("wishlist");
    } catch (error) {
      console.error("Error adding product to wishlist", error);
      alert("Failed to add product to wishlist. Try again.");
    }
  };
  const handleViewClick = () => {
    if (snackbarAction === "cart") {
      navigate("/cart"); // Or use `window.location.href = '/cart'`
    } else if (snackbarAction === "wishlist") {
      navigate("/wishlist");
    }
    setSuccessMessage("");
  };



  if (loading) {
    return (
      <div
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100vw',
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          
          zIndex: 9999,
        }}
      >
        <CircularProgress />
      </div>
    );
  }
  

  if (!product) {
    return <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif` }}>Product not found</Typography>;
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, marginBottom: "30px", position: "relative" }}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{
              width: "100%",
              height: 350,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              overflow: "hidden",
            }}
          >
            {selectedImage && ( // Render only when selectedImage is set
              <CardMedia
                component="img"
                image={selectedImage}
                alt="Product Image"
                sx={{ width: "100%", height: "100%", objectFit: "contain" }}
              />
            )}
          </Card>

          <Stack direction="row" spacing={1} mt={2} sx={{ overflowX: "auto", py: 1 }}>
            {product?.images?.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={`${BASE_URL}${img}`}
                alt={`Thumbnail ${index}`}
                onClick={() => setSelectedImage(`${BASE_URL}${img}`)}
                sx={{
                  width: 60,
                  height: 60,
                  cursor: "pointer",
                  border: selectedImage.includes(img) ? "3px solid #a89160" : "2px solid black", // Highlight selected
                  objectFit: "cover",
                  flexShrink: 0,
                }}
              />
            ))}
          </Stack>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              '@media (max-width: 900px)': {
                paddingBottom: '80px',
              },
            }}
          >
            <Stack
              spacing={2}
              sx={{
                maxHeight: { md: "500px" }, // Only set maxHeight on medium screens and up
                overflowY: { md: "auto" }, // Only enable vertical scrolling on medium screens and up
                paddingRight: { md: "10px" }, // Add padding only on larger screens
              }}
            >
              <Box display="flex" justifyContent="space-between" alignItems="center">
                <Typography variant="h5" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  {product.name}
                </Typography>
              </Box>

              <Box>
                <Box display="flex" alignItems="center">
                  <Typography variant="h6" color="primary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                    ₹{product.finalPrice}
                    <Typography component="span" sx={{ textDecoration: "line-through", color: "gray", ml: 1, fontFamily: `"Montserrat", sans-serif` }}>
                      ₹{product.price}
                    </Typography>
                    {product.price > product.finalPrice && (
                      <Chip
                        label={`${Math.round(((product.price - product.finalPrice) / product.price) * 100)}% Off`}
                        color="success"
                        sx={{ ml: 2, fontFamily: `"Montserrat", sans-serif` }}
                      />
                    )}
                  </Typography>
                </Box>

                <Box display="flex" alignItems="center" sx={{ mt: 1 }}>
                  <Box sx={{ fontFamily: `"Montserrat", sans-serif`, backgroundColor: "#2E7D32", color: "white", px: 1, py: 0.5, borderRadius: 1, fontWeight: "bold", display: "flex", alignItems: "center" }}>
                    {product.averageRating} ★
                  </Box>
                  <Typography variant="body1" sx={{ fontFamily: `"Montserrat", sans-serif`, ml: 1, fontWeight: "bold", color: "#666" }}>
                    {product.totalReviews.toLocaleString()} Ratings & {product.reviews.length.toLocaleString()} Reviews
                  </Typography>
                </Box>
              </Box>

              <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>Brand: {product.brand}</Typography>

              <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>Description</Typography>
              <Typography variant="body1" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                {product.description}
              </Typography>

              <Typography variant="subtitle1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif` }}>Specifications</Typography>
              <ul style={{ fontFamily: `"Montserrat", sans-serif` }}>
                {Object.entries(product.attributes).map(([key, value]) => (
                  <li key={key}>{`${key}: ${value}`}</li>
                ))}
              </ul>

              <ProductRatings />
            </Stack>
          </Box>
        </Grid>

        {/* Fixed buttons for mobile */}
        <Box
          sx={{
            position: 'fixed',
            bottom: 50,
            left: 0,
            right: 0,
            backgroundColor: 'white',
            padding: 2,
            boxShadow: '0px -2px 10px rgba(0,0,0,0.1)',
            display: { xs: 'block', md: 'none' },
            zIndex: 1000,
          }}
        >
          <Stack direction="row" spacing={2}>
            <Button
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => handleAddToCart(e, product._id)}
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
            >
              Add To Cart
            </Button>
            <Button
              variant="outlined"
              color="primary"
              fullWidth
              onClick={(e) => handleAddToWishlist(e, product._id)}
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
            >
              Add To Wishlist
            </Button>
          </Stack>
        </Box>

        {/* Regular buttons for desktop */}
        <Grid item xs={12} md={6} sx={{ display: { xs: 'none', md: 'block' } }}>
          <Stack direction="row" spacing={2}>
            <Button
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
              variant="contained"
              color="primary"
              fullWidth
              onClick={(e) => handleAddToCart(e, product._id)}
            >
              Add To Cart
            </Button>
            <Button
              sx={{ fontFamily: `"Montserrat", sans-serif` }}
              variant="outlined"
              color="primary"
              fullWidth
              onClick={(e) => handleAddToWishlist(e, product._id)}
            >
              Add To Wishlist
            </Button>
          </Stack>
        </Grid>

        {isLoginOpen && <LoginModal show={isLoginOpen} handleClose={closeLoginModal} />}

        <Snackbar
          open={!!successMessage}
          autoHideDuration={3000}
          onClose={() => setSuccessMessage("")}
          message={successMessage}
          anchorOrigin={{ vertical: "top", horizontal: "right" }}
          action={
            <Button color="white" size="small" onClick={handleViewClick}>
              View
            </Button>
          }
        />
      </Grid>
    </Container>
  );
};

export default SingleProductView;