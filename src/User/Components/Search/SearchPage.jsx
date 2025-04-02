import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
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
import { searchProducts } from "../../../Services/allApi"; // Import the search API function
import LoginModal from "../LoginModel";
import FilterSearch from "./FilterSearch";

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

const SearchResultsPage = () => {
    const navigate = useNavigate();
    const { searchQuery } = useParams(); // Get the search query from the URL
    const [products, setProducts] = useState([]);
    const [filteredProducts, setFilteredProducts] = useState([]);

    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const [wishlist, setWishlist] = useState(new Set());
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginOpen(false);
    };

    useEffect(() => {
        const fetchSearchResults = async () => {
            try {
                const response = await searchProducts(searchQuery);
                const data = response.products;
                setProducts(Array.isArray(data) ? data : []);
                setFilteredProducts(Array.isArray(data) ? data : []); // Set filteredProducts initially to products
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch search results", error);
                setProducts([]);
                setFilteredProducts([]);
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

        fetchSearchResults();
        fetchWishlist();
    }, [searchQuery]); // Re-fetch when the search query changes

    const handleAddToCart = async (e, productId) => {
        e.stopPropagation();
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

    const handleAddToWishlist = async (e, productId) => {
        e.stopPropagation();
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

    const handleFilterChange = (filters) => {
        let filtered = [...products];

        if (filters.brand) {
            filtered = filtered.filter(product => product.brand === filters.brand);
        }

        if (filters.priceRange) {
            filtered = filtered.filter(product =>
                product.finalPrice >= filters.priceRange[0] && product.finalPrice <= filters.priceRange[1]
            );
        }

        if (filters.rating) {
            filtered = filtered.filter(product => product.averageRating >= filters.rating);
        }

        setFilteredProducts(filtered.length > 0 ? filtered : products); // Show original results if no filters are applied
    };


    if (loading) {
        return <CircularProgress />;
    }

    if (!Array.isArray(products)) {
        return <Typography variant="h6">No products found.</Typography>;
    }

    return (
        <Box>
            <AppBar position="static" color="transparent" elevation={0}>
                {/* <Toolbar>
          <Typography variant="h6">Search Results for "{searchQuery}"</Typography>
        </Toolbar> */}
            </AppBar>
            <Container sx={{ py: 4 }}>
                <FilterSearch
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
                                        {/* Product Name (Truncated to 10 characters) */}
                                        <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                                            {product.name.length > 10 ? `${product.name.substring(0, 10)}...` : product.name}
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
                                            <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="body2" color="text.secondary">
                                                ({product.totalReviews > 0 ? `${product.totalReviews} Reviews` : "0 Reviews"})
                                            </Typography>
                                        </Stack> */}

                                        {/* Pricing Section */}
                                        <Stack direction="row" spacing={1} alignItems="center">
                                            {/* Original Price (Strikethrough) */}
                                            {product.price && (
                                                <Typography variant="body1" color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, textDecoration: "line-through" }}>
                                                    ₹{product.price}
                                                </Typography>
                                            )}

                                            {/* Final Price (Highlighted) */}
                                            <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="h6" color="error" fontWeight="bold">
                                                ₹{product.finalPrice || product.price}
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
            />
        </Box>
    );
};

export default SearchResultsPage;