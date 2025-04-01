import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, Box, Typography, Button, CircularProgress, Snackbar } from "@mui/material";
import { styled } from "@mui/system";
import { getAllProducts, addToCart } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png"
import LoginModal from "../LoginModel";

const BASE_URL = "https://rigsdock.com/uploads/";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{ padding: 2, textAlign: "center", boxShadow: 3, cursor: "pointer" }}
      onClick={() => navigate(`/single/${product._id}`)}
    >
      {/* <Typography variant="caption" color="textSecondary">
        {product.brand}
      </Typography> */}
      <img
        src={`${BASE_URL}/${product.images[0]}`}
        // src={placeholder}
        alt={product.name}
        style={{ width: "100px", margin: "10px auto" }}
      />
      <Typography
        variant="body1"
        color="primary"
        sx={{
          fontWeight: "bold",
          whiteSpace: "nowrap", // Prevents text from wrapping
          overflow: "hidden", // Hides overflow text
          textOverflow: "ellipsis", // Adds "..."
          maxWidth: "100%", // Ensures text doesn't exceed container width
          display: "block",
          fontFamily: `"Montserrat", sans-serif`,
        }}
      >
        {product.name}
      </Typography>

      <Typography variant="body2" sx={{ textDecoration: "line-through", fontFamily: `"Montserrat", sans-serif`, }}>
      ₹ {product.price}
      </Typography>
      <Typography variant="body2" color="error" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
      ₹ {product.finalPrice || product.price}
      </Typography>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 1, fontFamily: `"Montserrat", sans-serif`, }}
        onClick={(e) => handleAddToCart(e, product._id)}
      >
        Add to cart
      </Button>
    </Card>
  );
};

const SpecialOfferCard = styled(Card)({
  padding: 20,
  textAlign: "center",
  background: "#fff",
  boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
});

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
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
        const data = await getAllProducts();
        console.log("API Response:", data);

        if (!Array.isArray(data)) {
          console.error("Invalid API response: Expected an array, received:", data);
          return;
        }

        setProducts(data.slice(0, 9));
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

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
      setTimeout(() => setSuccessMessage(""), 3000);
    } catch (error) {
      console.error("Error adding product to cart", error);
      alert("Failed to add product to cart. Try again.");
    }
  };

  const handleViewMore = () => {
    navigate("/allproducts"); // Navigate to a dedicated deals page
  };

  return (
    <Container sx={{ my: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
          <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif`, }}>Our</Box> Products
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold", cursor: "pointer", "&:hover": { textDecoration: "underline" } }}
          onClick={handleViewMore}
        >
          View More
        </Typography>
      </Box>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          {products.length > 0 && (
            <Box
              sx={{ cursor: "pointer" }}
              onClick={() => navigate(`/single/${products[0]._id}`)}
            >
              <SpecialOfferCard>
                <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>Special Offer</Typography>
                <Typography variant="body2" color="secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
                  Save 10%
                </Typography>
                <img
                  src={`${BASE_URL}/${products[0].images[0]}`}
                  // src={placeholder}
                  alt={products[0].name}
                  style={{ width: "100%" }}
                />
                <Typography variant="body1" fontWeight="bold" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
                  {products[0].name}
                </Typography>
                <Typography variant="h6" color="error" sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
                ₹ {products[0].finalPrice || products[0].price}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", fontFamily: `"Montserrat", sans-serif`, }}>
                ₹ {products[0].price}
                </Typography>
              </SpecialOfferCard>
            </Box>
          )}
        </Grid>

        <Grid item xs={12} md={8}>
          {loading ? (
            <Box display="flex" justifyContent="center" alignItems="center">
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={2}>
              {products.slice(1, 9).map((product, index) => (
                <Grid item xs={6} sm={6} md={3} key={index}> {/* Updated xs from 12 to 6 */}
                  <ProductCard product={product} handleAddToCart={handleAddToCart} />
                </Grid>
              ))}
            </Grid>

          )}
        </Grid>
      </Grid>
      {isLoginOpen && <LoginModal show={isLoginOpen} handleClose={closeLoginModal} />}

      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      />
    </Container>
  );
};

export default OurProducts;
