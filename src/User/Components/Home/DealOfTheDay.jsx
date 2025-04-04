import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography, Box, CircularProgress } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { dealOfTheDay } from "../../../Services/allApi";
import placeholder from '../../../Assets/PlacHolder.png';

// Styled components
const SpecialOfferCard = styled(Card)(({ theme }) => ({
  padding: 0,
  background: "#E6F0FF",
  boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  borderRadius: theme.shape.borderRadius,
  display: "flex",
  minHeight: theme.breakpoints.down('sm') ? '350px' : 'auto',
  transition: 'all 0.3s ease',
}));

const ProductCard = styled(Card)({
  padding: 20,
  background: "#FFFFFF", // Changed to white
  boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  position: "relative",
  overflow: "hidden",
  height: "100%",
  borderRadius: 8,
  display: "flex",
});


const DiscountTagRibbon = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "110px",
  height: "70px",
  backgroundColor: "#D10000",
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  clipPath: "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)",
  fontWeight: "bold",
  zIndex: 1, // Ensure it appears above other content
  [theme.breakpoints.down('sm')]: {
    width: "90px", // Slightly smaller on mobile
    height: "60px"
  }
}));


const DealOfTheDay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "https://rigsdock.com/uploads/";
  const navigate = useNavigate();

  useEffect(() => {
    const fetchDeals = async () => {
      try {
        const data = await dealOfTheDay();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching deal of the day", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDeals();
  }, []);

  const handleViewMore = () => {
    navigate("/dealoftheday");
  };

  // Calculate discount percentage
  const calculateDiscount = (originalPrice, finalPrice) => {
    const discount = ((originalPrice - finalPrice) / originalPrice) * 100;
    return Math.round(discount);
  };

  return (
    <Container sx={{ my: 4 }}>
      <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
        {/* Left Side: "Deal Of The Day" */}
        <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
          <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif` }}>
            Deal
          </Box> Of The Day
        </Typography>

        {/* View More Button */}
        <Typography
          variant="body1"
          color="primary"
          sx={{
            fontFamily: `"Montserrat", sans-serif`,
            fontWeight: "bold",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
            ml: 2
          }}
          onClick={handleViewMore}
        >
          View More
        </Typography>
      </Box>

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          {/* First row - Full width featured product */}
          {products.length > 0 && (
            <Grid item xs={12}>
              <SpecialOfferCard onClick={() => navigate(`/single/${products[0].product._id}`)}>
                {/* Discount Ribbon - positioned absolutely */}
                <DiscountTagRibbon>
                  <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0, fontSize: { xs: "1.25rem", sm: "1.5rem" } }}>
                    {calculateDiscount(products[0].product.price, products[0].offerPrice)}%
                  </Typography>
                  <Typography variant="body1" sx={{ fontSize: { xs: "0.75rem", sm: "0.875rem" } }}>off</Typography>
                </DiscountTagRibbon>

                {/* Main content container */}
                <Box sx={{
                  display: 'flex',
                  flexDirection: { xs: 'column', sm: 'row' },
                  alignItems: 'center',
                  width: '100%',
                  height: '100%',
                  position: 'relative' // Needed for absolute positioning of ribbon
                }}>
                  {/* Text content */}
                  <Box sx={{
                    flex: 2,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: { xs: 'center', sm: 'flex-start' },
                    textAlign: { xs: 'center', sm: 'left' },
                    px: { xs: 2, sm: 4, md: 6, lg: 8 },
                    py: { xs: 3, sm: 3 },
                    width: '100%',
                    pt: { xs: 4, sm: 3 } // Add padding top to avoid ribbon overlap
                  }}>
                    <Typography variant="h4" sx={{
                      fontFamily: `"Montserrat", sans-serif`,
                      mb: 1,
                      fontSize: { xs: "1.50rem", sm: "1.5rem", md: "1.75rem", lg: "2rem" }
                    }}>
                      Special Offer
                    </Typography>

                    <Typography variant="h5" sx={{
                      fontFamily: `"Montserrat", sans-serif`,
                      fontWeight: "bold",
                      mb: 1,
                      fontSize: { xs: "1.6rem", sm: "1.25rem", md: "1.4rem", lg: "1.5rem" }
                    }}>
                      {products[0].product.name}
                    </Typography>

                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: { xs: 'center', sm: 'flex-start' },
                      mb: 2
                    }}>
                      <Typography sx={{
                        fontFamily: `"Montserrat", sans-serif`,
                        fontSize: { xs: "1rem", sm: "1rem" }
                      }}>
                        <s> ₹{products[0].product.price} </s> <b> ₹{products[0].offerPrice}</b>
                      </Typography>
                    </Box>
                  </Box>

                  {/* Image container */}
                  <Box sx={{
                    flex: 1,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    width: { xs: '100%', sm: 'auto' },
                    p: { xs: 2, sm: 3 },
                    order: { xs: 2, sm: 1 }
                  }}>
                    <img
                      src={`${BASE_URL}${products[0].product.images[0]}`}
                      onError={(e) => { e.target.src = placeholder; }}
                      alt={products[0].product.name}
                      style={{
                        maxWidth: "90%",
                        height: 'auto',
                        maxHeight: { xs: "150px", sm: "180px", md: "200px", lg: "220px" },
                        objectFit: "contain"
                      }}
                    />
                  </Box>
                </Box>
              </SpecialOfferCard>
            </Grid>
          )}

          {/* Second row - Three products */}
          {products.slice(1, 4).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={`row2-${index}`}>
              <ProductCard onClick={() => navigate(`/single/${item.product._id}`)}>
                <Box sx={{ flex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: 2 }}>
                  <Typography variant="body1" color="textSecondary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                    {item.product.brand}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold", mb: 1 }}>
                    {item.product.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <Typography variant="body1" sx={{ textDecoration: "line-through", color: "#666", fontFamily: `"Montserrat", sans-serif` }}>
                      ₹{item.product.price}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: `"Montserrat", sans-serif`, color: "#D10000" }}>
                      ₹{item.offerPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "#D10000", color: "white", padding: "5px 10px", borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {calculateDiscount(item.product.price, item.offerPrice)}% OFF
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                  <img
                    src={`${BASE_URL}${item.product.images[0]}`}
                    onError={(e) => { e.target.src = placeholder; }}
                    alt={item.product.name}
                    style={{ maxWidth: "100%", height: "150px", objectFit: "contain" }}
                  />
                </Box>
              </ProductCard>
            </Grid>
          ))}

          {/* Third row - Three products */}
          {products.slice(4, 7).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} key={`row3-${index}`}>
              <ProductCard onClick={() => navigate(`/single/${item.product._id}`)}>
                <Box sx={{ flex: 2, display: "flex", flexDirection: "column", justifyContent: "center", padding: 2 }}>
                  <Typography variant="body1" color="textSecondary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                    {item.product.brand}
                  </Typography>
                  <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold", mb: 1 }}>
                    {item.product.name}
                  </Typography>
                  <Box sx={{ display: "flex", flexDirection: "column", mb: 1 }}>
                    <Typography variant="body1" sx={{ textDecoration: "line-through", color: "#666", fontFamily: `"Montserrat", sans-serif` }}>
                      ₹{item.product.price}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: `"Montserrat", sans-serif`, color: "#D10000" }}>
                      ₹{item.offerPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ position: "absolute", top: 10, right: 10, backgroundColor: "#D10000", color: "white", padding: "5px 10px", borderRadius: 1 }}>
                    <Typography variant="body2" sx={{ fontWeight: "bold" }}>
                      {calculateDiscount(item.product.price, item.offerPrice)}% OFF
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                  <img
                    src={`${BASE_URL}${item.product.images[0]}`}
                    onError={(e) => { e.target.src = placeholder; }}
                    alt={item.product.name}
                    style={{ maxWidth: "100%", height: "150px", objectFit: "contain" }}
                  />
                </Box>
              </ProductCard>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default DealOfTheDay;