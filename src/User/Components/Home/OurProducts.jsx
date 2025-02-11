import React from "react";
import { Container, Grid, Card, CardContent, Typography, Button } from "@mui/material";
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
    <Button variant="contained" color="primary" fullWidth sx={{ mt: 1 }}>
      Add to cart
    </Button>
  </Card>
);

const SpecialOfferCard = styled(Card)({
  padding: 20,
  textAlign: "center",
  background: "#fff",
  boxShadow: "3px 3px 10px rgba(0,0,0,0.1)",
});

const OurProducts = () => {
  const products = [
    {
      brand: "Bin Bakar Electronics",
      name: "Gree GS-12FTH...",
      image: "https://i.postimg.cc/jdpGkn53/2cc97d0e172ae783303181ee0ba6e46f.png",
      oldPrice: "66,000",
      newPrice: "56,000",
    },
    {
      brand: "Bin Bakar Electronics",
      name: "Gree Air...",
      image: "https://i.postimg.cc/mg70xZ1L/123f8e353c2f101176ae5f8fc112aebb.png",
      oldPrice: "66,000",
      newPrice: "171,000",
    },
    {
      brand: "Bin Bakar Electronics",
      name: "Samsung...",
      image: "https://i.postimg.cc/vTjpycvB/1fc9b18bf658022df960df5dc71f56ad.png",
      oldPrice: "110,000",
      newPrice: "101,000",
    },
    {
      brand: "Bin Bakar Electronics",
      name: "Haier HSU...",
      image: "https://i.postimg.cc/xj4rM4S2/90a987630f53cf49962424e09cf35b99.png",
      oldPrice: "66,000",
      newPrice: "70,000",
    },
    {
        brand: "Bin Bakar Electronics",
        name: "Gree GS-12FTH...",
        image: "https://i.postimg.cc/jdpGkn53/2cc97d0e172ae783303181ee0ba6e46f.png",
        oldPrice: "66,000",
        newPrice: "56,000",
      },
      {
        brand: "Bin Bakar Electronics",
        name: "Gree Air...",
        image: "https://i.postimg.cc/mg70xZ1L/123f8e353c2f101176ae5f8fc112aebb.png",
        oldPrice: "66,000",
        newPrice: "171,000",
      },
      {
        brand: "Bin Bakar Electronics",
        name: "Samsung...",
        image: "https://i.postimg.cc/vTjpycvB/1fc9b18bf658022df960df5dc71f56ad.png",
        oldPrice: "110,000",
        newPrice: "101,000",
      },
      {
        brand: "Bin Bakar Electronics",
        name: "Haier HSU...",
        image: "https://i.postimg.cc/xj4rM4S2/90a987630f53cf49962424e09cf35b99.png",
        oldPrice: "66,000",
        newPrice: "70,000",
      },
  ];

  return (
    <Container sx={{ my: 4 }}>
      <Typography variant="h5" sx={{ fontWeight: "bold", color: "#002F6C", mb: 3 }}>
        Our Products
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <SpecialOfferCard>
            <Typography variant="h6">Special Offer</Typography>
            <Typography variant="body2" color="secondary">
              save 10%
            </Typography>
            <img
              src="https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png"
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
            {/* Adjust Grid to make sure 4 cards are displayed in a row */}
            {products.map((product, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <ProductCard product={product} />
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default OurProducts;
