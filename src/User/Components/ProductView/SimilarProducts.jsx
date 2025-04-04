import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import {
  Box, Card, CardContent, CardMedia, IconButton, Stack, Typography, Button, Container, Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import placeholder from "../../../Assets/PlacHolder.png";
import { addToCart, getSimilarProducts, addToWishlist, getWishlist, removeWishlist } from "../../../Services/allApi"; // Import removeWishlist
import LoginModal from "../LoginModel";

const SimilarProducts = () => {
  const { productId } = useParams(); // Get product ID from URL params
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState(""); // State for Snackbar
  const [wishlist, setWishlist] = useState(new Set());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [snackbarAction, setSnackbarAction] = useState(null);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // Fetch similar products
  useEffect(() => {
    const fetchProducts = async () => {
      if (productId) {
        const data = await getSimilarProducts(productId);
        setProducts(data);
      }
    };
    fetchProducts();
  }, [productId]);

  // Fetch user's wishlist
  useEffect(() => {
    const fetchWishlist = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const data = await getWishlist(userId);

        if (!data || !Array.isArray(data)) {
          console.warn("Unexpected wishlist format:", data);
          return;
        }

        const wishlistSet = new Set(data.map(item => item._id)); // Extract product IDs
        setWishlist(wishlistSet);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchWishlist();
  }, []);

  // Add to cart handler
  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Prevent card click navigation
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openLoginModal(); // Show the login modal when user is not logged in
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

  // Add/remove from wishlist handler
  const handleAddToWishlist = async (e, productId) => {
    e.stopPropagation(); // Prevent card click navigation
    const userId = localStorage.getItem("userId");
    if (!userId) {
      openLoginModal(); // Show the login modal when user is not logged in
      return;
    }

    try {
      if (wishlist.has(productId)) {
        // If the product is already in the wishlist, remove it
        await removeWishlist(userId, productId);
        setWishlist((prevWishlist) => {
          const newWishlist = new Set(prevWishlist);
          newWishlist.delete(productId);
          return newWishlist;
        });
        setSuccessMessage("Product removed from wishlist!");
        setSnackbarAction("wishlist");
      } else {
        // If the product is not in the wishlist, add it
        await addToWishlist(userId, productId);
        setWishlist((prevWishlist) => {
          const newWishlist = new Set(prevWishlist);
          newWishlist.add(productId);
          return newWishlist;
        });
        setSuccessMessage("Product added to wishlist!");
        setSnackbarAction("wishlist");
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
      alert("Failed to update wishlist. Try again.");
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

  return (
    <Container sx={{ py: 6 }}>
      <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
        <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif`, }}>Similar</Box> Products
      </Typography>

      <Box
        sx={{
          display: "flex",
          gap: 3,
          overflowX: "auto",
          pb: 2,
          scrollSnapType: "x mandatory",
          "&::-webkit-scrollbar": { height: 8 },
          "&::-webkit-scrollbar-track": { backgroundColor: "#f1f1f1", borderRadius: 3 },
          "&::-webkit-scrollbar-thumb": {
            backgroundColor: "#999",
            borderRadius: 10,
            "&:hover": { backgroundColor: "#666" },
          },
        }}
      >
        {products.length > 0 ? (
          products.map((product) => (
            <Card
              key={product._id}
              sx={{
                minWidth: 250,
                maxWidth: 260,
                flexShrink: 0,
                bgcolor: "background.paper",
                borderRadius: 3,
                boxShadow: 3,
                transition: "transform 0.3s ease, box-shadow 0.3s ease",
                "&:hover": { transform: "translateY(-5px)", boxShadow: 6 },
                position: "relative",
                cursor: "pointer"
              }}
              onClick={() => {
                navigate(`/single/${product._id}`);
                window.scrollTo({ top: 0, behavior: "smooth" });
              }}
                          >
              {/* Wishlist Icon */}
              <IconButton
                sx={{
                  position: "absolute",
                  top: 10,
                  right: 10,
                  color: wishlist.has(product._id) ? "red" : "gray", // Change color if in wishlist
                  zIndex: 1,
                  opacity: 1, // Ensure it's always visible
                  transition: "opacity 0.3s ease", // Optional: Add a smooth transition
                }}
                onClick={(e) => handleAddToWishlist(e, product._id)}
              >
                {wishlist.has(product._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
              </IconButton>

              {/* Product Image */}
              <CardMedia
                component="img"
                height="180"
                // image={placeholder}
                image={`https://rigsdock.com/uploads/${product?.images?.[0]}`}
                alt={product.name}
                sx={{ objectFit: "cover", borderTopLeftRadius: 12, borderTopRightRadius: 12 }}
              />

              {/* Product Details */}
              <CardContent>
                <Stack spacing={1}>
                  {/* Product Name */}
                  <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                    {product.name.length > 20 ? `${product.name.substring(0, 10)}...` : product.name}
                  </Typography>

                  {/* Brand Name */}
                  <Typography variant="body2" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                    Brand: {product.brand || "Unknown"}
                  </Typography>

                  {/* Rating Section */}
                  {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                    <Typography variant="body2" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold", color: "#ff9800" }}>
                      ⭐ {product.averageRating > 0 ? product.averageRating : "0 Ratings"}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
                      ({product.totalReviews > 0 ? `${product.totalReviews} Reviews` : "0 Reviews"})
                    </Typography>
                  </Stack> */}

                  {/* Pricing Section */}
                  <Stack direction="row" spacing={1} alignItems="center">
                    {/* Original Price (Strikethrough) */}
                    {product.price && (
                      <Typography variant="body1" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, textDecoration: "line-through" }}>
                        ₹ {product.price}
                      </Typography>
                    )}

                    {/* Final Price (Highlighted) */}
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="h6" color="error" fontWeight="bold">
                    ₹ {product.finalPrice || product.price}
                    </Typography>
                  </Stack>

                  {/* Add to Cart Button */}
                  <Button
                    variant="contained"
                    fullWidth
                    onClick={(e) => handleAddToCart(e, product._id)}
                    sx={{ fontFamily: `"Montserrat", sans-serif`, }}
                  >
                    Add to Cart
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          ))
        ) : (
          <Typography sx={{ textAlign: "center", width: "100%", fontFamily: `"Montserrat", sans-serif`, }}>No similar products found.</Typography>
        )}
      </Box>
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
    </Container>
  );
};

export default SimilarProducts;