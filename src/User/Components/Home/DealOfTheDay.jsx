import React, { useEffect, useState } from "react";
import { Container, Grid, Card, Typography, Box, CircularProgress, Chip } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import { dealOfTheDay } from "../../../Services/allApi";
import placeholder from '../../../Assets/PlacHolder.png';

const SpecialOfferCard = styled(Card)({
  padding: 20,
  textAlign: "center",
  background: "#fff",
  boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
  cursor: "pointer",
  position: "relative",
  overflow: "visible",
});

const DiscountTag = styled(Box)(({ color }) => ({
  position: "absolute",
  top: -10,
  right: -10,
  width: 60,
  height: 60,
  borderRadius: "50%",
  backgroundColor: color,
  color: "white",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 1,
  boxShadow: "0 2px 5px rgba(0,0,0,0.2)",
  fontSize: "0.7rem",
  fontWeight: "bold",
}));

const DealOfTheDay = () => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const BASE_URL = "http://localhost:3006/uploads/";
  const navigate = useNavigate();

  // Color options for discount tags
  const discountColors = [
    "#1976d2", // blue
   
  ];

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
        <Typography variant="h5" component="h2" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
          <Box component="span" sx={{ color: "primary.main", fontFamily: `"Montserrat", sans-serif` }}>Deal</Box> Of The Day
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

      {loading ? (
        <Box display="flex" justifyContent="center">
          <CircularProgress />
        </Box>
      ) : (
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            {products.length > 0 && (
              <SpecialOfferCard onClick={() => navigate(`/single/${products[0].product._id}`)}>
                <DiscountTag color={discountColors[0]}>
                  <span>Save</span>
                  <span>{calculateDiscount(products[0].product.price, products[0].offerPrice)}%</span>
                </DiscountTag>
                <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                  Special Offer
                </Typography>
                <img
                  src={placeholder}
                  alt={products[0].product.name}
                  style={{ width: "100%", maxHeight: "250px", objectFit: "contain" }}
                />
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="body1" fontWeight="bold">
                  {products[0].product.name}
                </Typography>
                <Typography sx={{ fontFamily: `"Montserrat", sans-serif` }} variant="h6" color="error">
                ₹ {products[0].offerPrice}
                </Typography>
                <Typography variant="body2" sx={{ textDecoration: "line-through", fontFamily: `"Montserrat", sans-serif` }}>
                ₹ {products[0].product.price}
                </Typography>
              </SpecialOfferCard>
            )}
          </Grid>

          <Grid item xs={12} md={8}>
  <Grid container spacing={2}>
    {products.slice(1).map((item, index) => {
      const discountPercent = calculateDiscount(item.product.price, item.offerPrice);
      const colorIndex = (index + 1) % discountColors.length;
      
      return (
        <Grid item xs={12} sm={6} key={index}>
          <Card
            sx={{
              display: "flex",
              flexDirection: "row",
              boxShadow: 3,
              padding: 2,
              cursor: "pointer",
              position: "relative",
              overflow: "hidden", // Ensure badge doesn't overflow
            }}
            onClick={() => navigate(`/single/${item.product._id}`)}
          >
            <Box sx={{ flex: 1, paddingRight: 2, textAlign: "left", position: "relative" }}>
              {/* Move Discount Badge inside the left content area */}
              <DiscountTag color={discountColors[colorIndex]} sx={{ position: "absolute", top: "100px", left: "10px" }}>
                <span>Save</span>
                <span>{discountPercent}%</span>
              </DiscountTag>

              <Typography variant="caption" color="textSecondary" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
                {item.product.brand}
              </Typography>
              <Typography variant="body1" color="primary" sx={{ fontWeight: "bold", fontFamily: `"Montserrat", sans-serif` }}>
                {item.product.name}
              </Typography>
              <Typography variant="body2" sx={{ textDecoration: "line-through", fontFamily: `"Montserrat", sans-serif` }}>
              ₹ {item.product.price}
              </Typography>
              <Typography variant="body2" color="error" sx={{ fontFamily: `"Montserrat", sans-serif` }}>
              ₹ {item.offerPrice}
              </Typography>
            </Box>

            {/* Product Image on the right side */}
            <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
              <img
                src={placeholder}
                alt={item.product.name}
                style={{
                  width: "100%",
                  height: "200px",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Card>
        </Grid>
      );
    })}
  </Grid>
</Grid>

        </Grid>
      )}
    </Container>
  );
};

export default DealOfTheDay;