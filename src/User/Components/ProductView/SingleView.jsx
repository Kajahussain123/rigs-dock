import React, { useState } from "react";
import { Container, Grid, Typography, Button, Box, Card, CardMedia, Chip, Stack } from "@mui/material";
import { FavoriteBorder } from "@mui/icons-material";

const images = [
  "https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png", // Main image
  "https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png", // Thumbnail 1
  "https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png", // Thumbnail 2
  "https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png", // Thumbnail 3
];

const SingleProductView = () => {
  const [mainImage, setMainImage] = useState(images[0]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 ,marginBottom:"30px"}}>
      <Grid container spacing={4}>
        {/* Product Image */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardMedia
              component="img"
              image={mainImage}
              alt="Product Image"
              sx={{ width: "100%", height: "auto" }}
            />
          </Card>
          <Stack direction="row" spacing={1} mt={2}>
            {images.map((img, index) => (
              <Box
                key={index}
                component="img"
                src={img}
                alt={`Thumbnail ${index}`}
                sx={{ width: 60, height: 60, cursor: "pointer", border: mainImage === img ? "2px solid black" : "none" }}
                onClick={() => setMainImage(img)}
              />
            ))}
          </Stack>
        </Grid>

        {/* Product Details */}
        <Grid item xs={12} md={6}>
          <Stack spacing={2}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h5" fontWeight="bold">
                JBL Tune 770NC Active Noise Cancelling Headphones
              </Typography>
              <FavoriteBorder sx={{ cursor: "pointer" }} />
            </Box>

            <Typography variant="h6" color="primary">
              ₹4,999 <Typography component="span" sx={{ textDecoration: "line-through", color: "gray", ml: 1 }}>₹9,999</Typography>
              <Chip label="50% Off" color="success" sx={{ ml: 2 }} />
            </Typography>

            <Typography variant="subtitle1" fontWeight="bold">Color</Typography>
            <Stack direction="row" spacing={1}>
              {["gray", "black", "blue"].map((color, index) => (
                <Box key={index} sx={{ width: 30, height: 30, bgcolor: color, borderRadius: "50%", cursor: "pointer" }} />
              ))}
            </Stack>

            <Typography variant="subtitle1" fontWeight="bold">Specifications</Typography>
            <ul>
              <li>With Mic: Yes</li>
              <li>Bluetooth version: 5.3</li>
              <li>Battery life: 70 hrs</li>
              <li>Active Noise Cancelling Headphones</li>
              <li>Fast Charging: 5 min = 3 Hours</li>
            </ul>

            <Stack direction={{ xs: "column", sm: "row" }} spacing={2}>
              <Button variant="contained" color="primary" fullWidth>
                Buy Now
              </Button>
              <Button variant="outlined" color="primary" fullWidth>
                Add to Cart
              </Button>
            </Stack>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
};

export default SingleProductView;