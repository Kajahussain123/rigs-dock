import React from "react";
import { Container, Grid, Card, CardContent, Typography, Box } from "@mui/material";
import { styled } from "@mui/system";

const ProductCard = ({ product }) => (
  <Card sx={{ padding: 2, textAlign: "center", boxShadow: 3 }}>
    <Typography variant="caption" color="textSecondary">
      {product.brand}
    </Typography>
    <img src={product.image} alt={product.name} style={{ width: "100px", margin: "10px auto" }} />
    <Typography variant="body1" color="primary" sx={{ fontWeight: "bold" }}>
      {product.name}
    </Typography>
    <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
      RS {product.oldPrice}
    </Typography>
    <Typography variant="body2" color="error">
      RS {product.newPrice}
    </Typography>
  </Card>
);

const SpecialOfferCard = styled(Card)({
  padding: 20,
  textAlign: "center",
  background: "#fff",
  boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
});

const DealOfTheDay = () => {
  const products = [
    {
      brand: "Bin Bakar Electronics",
      name: "Gree GS-12FTH...",
      image: "https://i.postimg.cc/nzKrS9qv/f2c58f9ed686f176fffd1f2588ee3745.png",
      oldPrice: "66,000",
      newPrice: "56,000",
    },
    {
      brand: "Bin Bakar Electronics",
      name: "Gree Air...",
      image: "https://i.postimg.cc/PJtxgfM0/f5fdfb9d331a9a77687ba57a16d7236f.png",
      oldPrice: "66,000",
      newPrice: "171,000",
    },
    {
      brand: "Bin Bakar Electronics",
      name: "Samsung...",
      image: "https://i.postimg.cc/KjJzxXqj/698ce781d8527460b256420ee16298cf.jpg",
      oldPrice: "110,000",
      newPrice: "101,000",
    },
    {
      brand: "Bin Bakar Electronics",
      name: "Haier HSU...",
      image: "https://i.postimg.cc/pVZyD8Wv/7bda3455eae9f1b1e68eaf50cdabffd3.png",
      oldPrice: "66,000",
      newPrice: "70,000",
    },
  ];

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#002F6C", mb: 3 }}>
        Deal Of The Day
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SpecialOfferCard>
            <Typography variant="h6">Special Offer</Typography>
            <Typography variant="body2" color="secondary">
              Save 10%
            </Typography>
            <img
              src="https://i.postimg.cc/MTg554bc/8218257cbe3d80abe8db1723d5c91d81.png"
              alt="JBL Headphone"
              style={{ width: "100%" }}
            />
            <Typography variant="body1" fontWeight="bold">
              JBL Headphone
            </Typography>
            <Typography variant="h6" color="error">
              RS 56,000
            </Typography>
            <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
              RS 66,000
            </Typography>
          </SpecialOfferCard>
        </Grid>
        <Grid item xs={12} md={8}>
          <Grid container spacing={2}>
            {/* Adjusted Grid to ensure two cards per row */}
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={6} key={index}>
                {/* Right-side Product Card with details on the left and image on the right */}
                <Card sx={{ display: "flex", flexDirection: "row", boxShadow: 3, padding: 2 }}>
                  <Box sx={{ flex: 1, paddingRight: 2, textAlign: "left" }}>
                    <Typography variant="caption" color="textSecondary">
                      {product.brand}
                    </Typography>
                    <Typography variant="body1" color="primary" sx={{ fontWeight: "bold" }}>
                      {product.name}
                    </Typography>
                    <Typography variant="body2" sx={{ textDecoration: "line-through" }}>
                      RS {product.oldPrice}
                    </Typography>
                    <Typography variant="body2" color="error">
                      RS {product.newPrice}
                    </Typography>
                  </Box>
                  <Box sx={{ flex: 1, display: "flex", justifyContent: "flex-end" }}>
                    <img
                      src={product.image}
                      alt={product.name}
                      style={{
                        width: "100%",
                        height: "200px",
                        objectFit: "contain",
                      }}
                    />
                  </Box>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DealOfTheDay;
