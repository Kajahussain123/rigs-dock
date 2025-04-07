import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Container,
  Grid,
  Stack,
  Toolbar,
  Typography,
  Snackbar,
  IconButton,
} from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import FavoriteIcon from "@mui/icons-material/Favorite";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { addToCart, addToWishlist, getWishlist, removeWishlist } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png";
import { getAllProducts } from "../../../Services/allApi";
import LoginModal from "../LoginModel";
import FilterSection from "./Filter";

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

const AllProductsPage = () => {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const [wishlist, setWishlist] = useState(new Set());
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [snackbarAction, setSnackbarAction] = useState(null); // 'cart' or 'wishlist'


  const openLoginModal = () => {
    setIsLoginOpen(true);
  };

  const closeLoginModal = () => {
    setIsLoginOpen(false);
  };

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const data = await getAllProducts();
        setProducts(data);
        setFilteredProducts(data); // Initialize filtered products with all products
        setLoading(false);
      } catch (error) {
        console.error("Failed to fetch products", error);
        setLoading(false);
      }
    };

    const fetchWishlist = async () => {
      const userId = localStorage.getItem("userId");
      if (!userId) return;

      try {
        const data = await getWishlist(userId);

        if (!data || !Array.isArray(data)) {
          console.warn("Unexpected wishlist format:", data);
          return;
        }

        const wishlistSet = new Set(data.map(item => item._id));
        setWishlist(wishlistSet);
      } catch (error) {
        console.error("Failed to fetch wishlist", error);
      }
    };

    fetchProducts();
    fetchWishlist();
  }, []);

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
      if (wishlist.has(productId)) {
        await removeWishlist(userId, productId);
        setWishlist((prevWishlist) => {
          const newWishlist = new Set(prevWishlist);
          newWishlist.delete(productId);
          return newWishlist;
        });
        setSuccessMessage("Product removed from wishlist!");
        setSnackbarAction("wishlist");
      } else {
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


  const handleFilterChange = (filters) => {
    let filtered = [...products];

    // Filter by brand
    if (filters.brand) {
      filtered = filtered.filter(product => product.brand === filters.brand);
    }

    // Filter by price range
    if (filters.priceRange) {
      filtered = filtered.filter(product =>
        product.finalPrice >= filters.priceRange[0] && product.finalPrice <= filters.priceRange[1]
      );
    }

    // Filter by rating
    if (filters.rating) {
      filtered = filtered.filter(product => product.averageRating >= filters.rating);
    }

    setFilteredProducts(filtered);
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

  return (
    <Box>
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          {/* <Typography variant="h6">Products</Typography> */}
        </Toolbar>
      </AppBar>
      <Container sx={{ py: 4 }}>
        {/* Add the FilterSection component */}
        <FilterSection
          onFilterChange={handleFilterChange}
          products={products} // Pass the products array
        />

        <Grid container spacing={3}>
          {filteredProducts.map((product) => (
            <Grid item xs={6} sm={6} md={4} lg={3} key={product._id}>
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
                    {/* Product Name */}
                    <Typography
                      variant="h6"
                      sx={{
                        fontFamily: `"Montserrat", sans-serif`,
                        fontSize: {
                          xs: '1rem',  // smaller font on mobile
                          sm: '1.25rem', // default for small screens and above
                        },
                      }}
                    >
                      {product.name.length > 10 ? `${product.name.substring(0, 10)}...` : product.name}
                    </Typography>

                    {/* Brand Name */}
                    <Typography
                      variant="body2"
                      color="text.secondary"
                      sx={{
                        fontFamily: `"Montserrat", sans-serif`,
                        fontWeight: "bold",
                        fontSize: {
                          xs: '0.75rem',
                          sm: '0.875rem',
                        },
                      }}
                    >
                      Brand: {product.brand ? (product.brand.length > 7 ? `${product.brand.slice(0, 7)}...` : product.brand) : "Unknown"}
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
                      {/* Original Price (Strikethrough) */}
                      {product.price && (
                        <Typography
                          variant="body1"
                          color="text.secondary"
                          sx={{
                            fontFamily: `"Montserrat", sans-serif`,
                            textDecoration: "line-through",
                            fontSize: {
                              xs: '0.85rem',
                              sm: '1rem',
                            },
                          }}
                        >
                          ₹ {product.price.toLocaleString('en-IN')}
                        </Typography>
                      )}

                      {/* Final Price (Highlighted) */}
                      <Typography
                        sx={{
                          fontFamily: `"Montserrat", sans-serif`,
                          fontWeight: 'bold',
                          fontSize: {
                            xs: '1rem',
                            sm: '1.25rem',
                          },
                        }}
                        variant="h6"
                        color="error"
                      >
                        ₹ {(product.finalPrice || product.price).toLocaleString('en-IN')}
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
            </Grid>
          ))}
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
        action={
          <Button color="white" size="small" onClick={handleViewClick}>
            View
          </Button>
        }
      />

    </Box>
  );
};

export default AllProductsPage;