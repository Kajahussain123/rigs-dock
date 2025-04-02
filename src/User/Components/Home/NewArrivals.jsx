import React, { useEffect, useState } from "react";
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box, Snackbar, useMediaQuery } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { addToCart, getLatestProducts } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png";
import LoginModal from "../LoginModel";

const NewArrivals = () => {
  const [products, setProducts] = useState([]);
  const [successMessage, setSuccessMessage] = useState("");
  const BASE_URL = "https://rigsdock.com/uploads/";
  const navigate = useNavigate();
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)"); // Check if screen width is less than 600px

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
    e.stopPropagation();
    const userId = localStorage.getItem("userId");
    if (!userId) {
      setIsLoginOpen(true);
      return;
    }
    try {
      await addToCart(userId, productId, 1);
      setSuccessMessage("Product added to cart successfully!");
    } catch (error) {
      console.error("Error adding product to cart", error);
    }
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" component="h2" sx={{ mb: 3, fontFamily: `"Montserrat", sans-serif` }}>
        <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif` }}>New </Box> Arrivals
      </Typography>

      {/* Large Cards - First Row */}
      <Grid container spacing={2} justifyContent="center">
        {products.slice(0, isMobile ? 1 : 2).map((product) => ( // Show 1 card on mobile, 2 on larger screens
          <Grid item xs={12} sm={6} key={product._id}>
            <Card
              sx={{ p: 2, borderRadius: 2, boxShadow: 3, cursor: "pointer", height: "100%", position: "relative" }}
              onClick={() => navigate(`/single/${product._id}`)}
            >
              {/* Offer Tag */}
              <Box
                sx={{
                  position: 'absolute',
                  right: 0,
                  top: 0,
                  backgroundColor: '#cc0000',
                  color: 'white',
                  padding: '4px 12px',
                  zIndex: 1,
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  clipPath: "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)",
                }}
              >
                <Typography variant="body2" sx={{ fontWeight: 'bold',fontFamily: `"Montserrat", sans-serif` }}>20%</Typography>
                <Typography variant="caption">off</Typography>
              </Box>

              <Typography variant="subtitle1" sx={{fontFamily: `"Montserrat", sans-serif`}}>{product.brand}</Typography>
              <Typography variant="h6" sx={{ mb: 1,fontFamily: `"Montserrat", sans-serif` }}>{product.name}</Typography>

              <CardMedia
                component="img"
                height="200"
                image={product.images?.[0] ? `${BASE_URL}${product.images[0]}` : placeholder}
                sx={{ objectFit: "contain" }}
              />

              {/* Price & Add to Cart Button in Same Row */}
              <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mt: 1 }}>
                <Typography sx={{fontFamily: `"Montserrat", sans-serif`}}>
                  <s>₹ {product.price}</s> <b>₹ {product.finalPrice}</b>
                </Typography>
                <Button variant="text"
                  color="primary"
                  size="small"
                  sx={{fontFamily: `"Montserrat", sans-serif`}}
                  onClick={(e) => handleAddToCart(e, product._id)}>Add To Cart</Button>
              </Box>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Small Cards - Second Row */}
      <Grid container spacing={2} justifyContent="space-between" sx={{ mt: 2 }}>
        {products.slice(2, 7).map((product) => (
          <Grid item xs={6} sm={4} md={2.4} key={product._id}>
            <Card
              sx={{ p: 2, borderRadius: 2, boxShadow: 2, cursor: "pointer" }}
              onClick={() => navigate(`/single/${product._id}`)}
            >
              <Typography variant="caption" sx={{fontFamily: `"Montserrat", sans-serif`}}>{product.brand}</Typography>
              <Typography variant="body2" sx={{ mb: 1,fontFamily: `"Montserrat", sans-serif` }}>{product.name}</Typography>
              <CardMedia
                component="img"
                height="100"
                image={product.images?.[0] ? `${BASE_URL}${product.images[0]}` : placeholder}
                sx={{ objectFit: "contain" }}
              />
              <Typography sx={{ mt: 1,fontFamily: `"Montserrat", sans-serif` }}>
                <s>₹ {product.price}</s> <b>₹ {product.finalPrice}</b>
              </Typography>
              <Button sx={{fontFamily: `"Montserrat", sans-serif`}} variant="contained" fullWidth onClick={(e) => handleAddToCart(e, product._id)}>Add to cart</Button>
            </Card>
          </Grid>
        ))}
      </Grid>

      {isLoginOpen && <LoginModal show={isLoginOpen} handleClose={() => setIsLoginOpen(false)} />}
      <Snackbar
        open={!!successMessage}
        autoHideDuration={3000}
        onClose={() => setSuccessMessage("")}
        message={successMessage}
      />
    </Box>
  );
};

export default NewArrivals;
