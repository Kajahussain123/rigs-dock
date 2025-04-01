import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  Button,
  Snackbar,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import placeholder from "../../../Assets/PlacHolder.png";
import { dealOfTheDay, addToCart, addToWishlist, removeWishlist, getWishlist } from "../../../Services/allApi"; // Import APIs
import LoginModal from "../LoginModel";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";


const ImageCarousel = ({ images = [] }) => {
  const BASE_URL = "https://rigsdock.com/uploads/";
  const defaultImage = "placeholder.png"; // Replace with an actual placeholder if needed
  const formattedImages = images.length ? images : [`${BASE_URL}${defaultImage}`];

  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % formattedImages.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + formattedImages.length) % formattedImages.length);
  };

  return (
    <Box sx={{ position: "relative" }}>
      <CardMedia
        component="img"
        height="200"
        image={formattedImages[currentImage]} // Ensure correct image is displayed
        alt="Product Image"
        sx={{ objectFit: "cover" }}
      />
      {formattedImages.length > 1 && (
        <>
          <Button
            sx={{
              position: "absolute",
              left: 0,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "36px",
              p: 0,
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.2)" },
            }}
            onClick={prevImage}
          >
            <ChevronLeftIcon />
          </Button>
          <Button
            sx={{
              position: "absolute",
              right: 0,
              top: "50%",
              transform: "translateY(-50%)",
              minWidth: "36px",
              p: 0,
              color: "white",
              "&:hover": { backgroundColor: "rgba(0,0,0,0.2)" },
            }}
            onClick={nextImage}
          >
            <ChevronRightIcon />
          </Button>
        </>
      )}
    </Box>
  );
};

const DealOfTheDayPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]); // State for products
  const [wishlist, setWishlist] = useState(new Set()); // State for wishlist
  const [successMessage, setSuccessMessage] = useState(""); // State for Snackbar
  const [isLoginOpen, setIsLoginOpen] = useState(false);

  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  // Fetch deal of the day products
  useEffect(() => {
    const fetchDealOfTheDay = async () => {
      try {
        const data = await dealOfTheDay();
        // Map the response to extract the `product` field from each item
        const formattedProducts = data.map((item) => ({
          ...item.product, // Spread the product details
          offerPrice: item.offerPrice, // Include offer price
          expiresAt: item.expiresAt, // Include expiration time
        }));
        setProducts(formattedProducts); // Set formatted products
      } catch (error) {
        console.error("Failed to fetch deal of the day products", error);
      }
    };

    fetchDealOfTheDay();
  }, []);

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
      } else {
        // If the product is not in the wishlist, add it
        await addToWishlist(userId, productId);
        setWishlist((prevWishlist) => {
          const newWishlist = new Set(prevWishlist);
          newWishlist.add(productId);
          return newWishlist;
        });
        setSuccessMessage("Product added to wishlist!");
      }
    } catch (error) {
      console.error("Error updating wishlist", error);
      alert("Failed to update wishlist. Try again.");
    }
  };

  return (
    <Box>
      {/* Full-width Banner Image */}
      <CardMedia
        component="img"
        image="https://i.postimg.cc/sDYnS889/360-F-361336183-dpu-Bw-Lkr-B1-Vnf-CXu1-Dr-Hh-D3-Cb-XZXq-UYK.jpg"
        alt="Deal of the Day"
        sx={{
          width: "100%",
          height: "auto",
          maxHeight: 300,
          objectFit: "cover",
        }}
      />

      <Container sx={{ py: 4 }}>
        <Grid container spacing={2}> {/* Reduced spacing for better mobile view */}
          {products.length > 0 ? (
            products.map((product) => (
              <Grid item xs={6} sm={6} md={4} lg={3} key={product._id}> {/* xs=6 ensures 2 cards per row on mobile */}
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    position: "relative",
                    "&:hover": { boxShadow: 6, cursor: "pointer" },
                  }}
                  onClick={() => navigate(`/single/${product._id}`)}
                >
                  {/* Wishlist (Love) Icon */}
                  <IconButton
                    sx={{
                      position: "absolute",
                      top: 10,
                      right: 10,
                      color: wishlist.has(product._id) ? "red" : "gray",
                      zIndex: 1,
                    }}
                    onClick={(e) => handleAddToWishlist(e, product._id)}
                  >
                    {wishlist.has(product._id) ? <FavoriteIcon /> : <FavoriteBorderIcon />}
                  </IconButton>

                  {/* Image Carousel */}
                  <ImageCarousel images={product?.images?.map(img => `https://rigsdock.com/uploads/${img}`) || []} />
                  <CardContent>
                    <Stack spacing={1}>
                      {/* Product Name (Truncated to 10 characters) */}
                      <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                        {product.name.length > 10 ? product.name.slice(0, 10) + "..." : product.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                        Brand: {product.brand || "Unknown"}
                      </Typography>

                      {/* Rating Section */}
                      {/* <Stack direction="row" alignItems="center" spacing={0.5}>
                        <Typography variant="body2" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold", color: "#ff9800" }}>
                          ⭐ {product.averageRating > 0 ? product.averageRating : "0 Ratings"}
                        </Typography>
                        <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body2" color="text.secondary">
                          ({product.totalReviews > 0 ? `${product.totalReviews} Reviews` : "0 Reviews"})
                        </Typography>
                      </Stack> */}



                      {/* Pricing Section */}
                      <Stack direction="row" spacing={1} alignItems="center">
                        {product.price && (
                          <Typography
                            variant="body1"
                            color="text.secondary"
                            sx={{ fontFamily: `"Montserrat", sans-serif`, textDecoration: "line-through" }}
                          >
                            ₹ {product.price}
                          </Typography>
                        )}
                        <Typography
                          sx={{ fontFamily: `"Montserrat", sans-serif` }}
                          variant="h6"
                          color="error"
                          fontWeight="bold"
                        >
                          ₹ {product.finalPrice || product.price}
                        </Typography>
                      </Stack>

                      {/* Add to Cart Button */}
                      <Button
                        variant="contained"
                        fullWidth
                        onClick={(e) => handleAddToCart(e, product._id)}
                        sx={{ fontFamily: `"Montserrat", sans-serif` }}
                      >
                        Add to Cart
                      </Button>
                    </Stack>
                  </CardContent>
                </Card>
              </Grid>
            ))
          ) : (
            <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, textAlign: "center", width: "100%" }}>
              No products found.
            </Typography>
          )}
        </Grid>
      </Container>


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

export default DealOfTheDayPage;