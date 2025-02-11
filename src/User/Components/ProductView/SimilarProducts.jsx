import React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Rating from '@mui/material/Rating';
import Stack from '@mui/material/Stack';

const SimilarProducts = () => {
  const products = [
    {
      id: 1,
      name: 'MINI Cooper',
      price: 'RS 30,000',
      rating: 5,
      image: 'https://i.postimg.cc/Ssr2N1DX/d757fa842d9ed291fe3e80752ed680b4.jpg',
      perDay: 'Per /day'
    },
    {
      id: 2,
      name: 'MINI Cooper',
      price: 'RS 30,000',
      rating: 5,
      image: 'https://i.postimg.cc/Ssr2N1DX/d757fa842d9ed291fe3e80752ed680b4.jpg',
      perDay: 'Per /day'
    },
    {
      id: 3,
      name: 'MINI Cooper',
      price: 'RS 30,000',
      rating: 5,
      image: 'https://i.postimg.cc/Ssr2N1DX/d757fa842d9ed291fe3e80752ed680b4.jpg',
      perDay: 'Per /day'
    },
    {
      id: 4,
      name: 'MINI Cooper',
      price: 'RS 30,000',
      rating: 5,
      image: 'https://i.postimg.cc/Ssr2N1DX/d757fa842d9ed291fe3e80752ed680b4.jpg',
      perDay: 'Per /day'
    },
    {
      id: 5,
      name: 'MINI Cooper',
      price: 'RS 30,000',
      rating: 5,
      image: 'https://i.postimg.cc/Ssr2N1DX/d757fa842d9ed291fe3e80752ed680b4.jpg',
      perDay: 'Per /day'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h6" sx={{ mb: 2 }}>
        Similar Product
      </Typography>

      <Box
        sx={{
          display: 'flex',
          gap: 2,
          overflowX: 'auto',
          '&::-webkit-scrollbar': {
            height: 6,
          },
          '&::-webkit-scrollbar-track': {
            backgroundColor: '#f1f1f1',
            borderRadius: 3,
          },
          '&::-webkit-scrollbar-thumb': {
            backgroundColor: '#888',
            borderRadius: 3,
            '&:hover': {
              backgroundColor: '#555',
            },
          },
          pb: 2  // Add padding to show scrollbar
        }}
      >
        {products.map((product) => (
          <Card
            key={product.id}
            sx={{
              minWidth: 280,
              maxWidth: 280,
              bgcolor: 'background.paper',
              flexShrink: 0,
            }}
          >
            <CardMedia
              component="img"
              height="200"
              image={product.image}
              alt={product.name}
              sx={{ objectFit: 'cover' }}
            />
            <CardContent>
              <Stack spacing={1}>
                <Typography variant="h6" component="div">
                  {product.name}
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Typography variant="h6" color="primary">
                    {product.price}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {product.perDay}
                  </Typography>
                </Box>
                <Rating value={product.rating} readOnly />
                <Button
                  variant="outlined"
                  fullWidth
                  sx={{ mb: 1 }}
                >
                  Add to cart
                </Button>
                <Button
                  variant="contained"
                  fullWidth
                  color="primary"
                >
                  Book Now
                </Button>
              </Stack>
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default SimilarProducts;