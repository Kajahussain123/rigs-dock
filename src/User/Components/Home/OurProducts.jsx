import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Container, Grid, Card, Box, Typography, Button, CircularProgress, Snackbar } from "@mui/material";
import { getAllProducts, addToCart } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png";
import LoginModal from "../LoginModel";

const BASE_URL = "https://rigsdock.com/uploads/";

const ProductCard = ({ product, handleAddToCart }) => {
  const navigate = useNavigate();

  return (
    <Card
      sx={{
        padding: 2,
        textAlign: "center",
        boxShadow: 3,
        cursor: "pointer",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between"
      }}
      onClick={() => navigate(`/single/${product._id}`)}
    >
      <img
        src={`${BASE_URL}/${product.images[0]}`}
        alt={product.name}
        style={{
          width: "100%",
          height: "120px",
          objectFit: "contain",
          margin: "0 auto"
        }}
      />
      <Box>
        <Typography
          variant="body1"
          color="primary"
          sx={{
            fontWeight: "bold",
            whiteSpace: "nowrap",
            overflow: "hidden",
            textOverflow: "ellipsis",
            maxWidth: "100%",
            display: "block",
            fontFamily: `"Montserrat", sans-serif`,
            mt: 1
          }}
        >
          {product.name}
        </Typography>

        <Typography variant="body2" sx={{ textDecoration: "line-through", fontFamily: `"Montserrat", sans-serif` }}>
          ₹ {product.price.toLocaleString('en-IN')}
        </Typography>
        <Typography variant="body2" color="error" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
        ₹ {(product.finalPrice || product.price).toLocaleString('en-IN')}
        </Typography>
      </Box>
      <Button
        variant="contained"
        color="primary"
        fullWidth
        sx={{ mt: 1, fontFamily: `"Montserrat", sans-serif` }}
        onClick={(e) => handleAddToCart(e, product._id)}
      >
        Add to cart
      </Button>
    </Card>
  );
};

const OurProducts = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [snackbarAction, setSnackbarAction] = useState(null);

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

        setProducts(data.slice(0, 10)); // Show 10 products (2 rows of 5)
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
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
      setTimeout(() => setSuccessMessage(""), 3000);
      window.dispatchEvent(new Event("cartUpdated"));

    } catch (error) {
      console.error("Error adding product to cart", error);
      alert("Failed to add product to cart. Try again.");
    }
  };

  const handleViewMore = () => {
    navigate("/allproducts");
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
    <Container sx={{ my: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
          <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif` }}>Our</Box> Products
        </Typography>
        <Typography
          variant="body1"
          color="primary"
          sx={{
            fontFamily: `"Montserrat", sans-serif`,
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" }
          }}
          onClick={handleViewMore}
        >
          View More
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center" alignItems="center" height="300px">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {products.map((product, index) => (
            <Grid item xs={6} sm={4} md={2.4} key={index} sx={{
              // Custom width for 5 items in a row
              '@media (min-width: 900px)': {
                flexBasis: '20%',
                maxWidth: '20%'
              }
            }}>
              <ProductCard product={product} handleAddToCart={handleAddToCart} />
            </Grid>
          ))}
        </Grid>
      )}

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

export default OurProducts;