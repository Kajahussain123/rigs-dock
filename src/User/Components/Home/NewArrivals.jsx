import React from 'react';
import { Typography, Button, Card, CardContent, CardMedia, Grid, Box } from '@mui/material';
import { useTheme, useMediaQuery } from '@mui/material';

const NewArrivals = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const products = [
    {
      id: 1,
      brand: 'Bin Bakar Electronics',
      name: 'Samsung 40N5300 Smart LED TV',
      image: 'https://i.postimg.cc/yxWw2Fct/43f38368cb9b512e83f5cca9215559eb.jpg',
      originalPrice: 'RS 60,000',
      price: 'RS 56,000'
    },
    {
      id: 2,
      brand: 'Bin Bakar Electronics',
      name: 'Samsung Automatic Washing Machine',
      image: 'https://i.postimg.cc/vTjpycvB/1fc9b18bf658022df960df5dc71f56ad.png',
      originalPrice: 'RS 20,000',
      price: 'RS 10,000'
    },
    {
      id: 3,
      brand: 'Bin Bakar Electronics',
      name: 'Haier HSU-12HFMAC Split AC',
      image: 'https://i.postimg.cc/xj4rM4S2/90a987630f53cf49962424e09cf35b99.png',
      originalPrice: 'RS 86,000',
      price: 'RS 70,000'
    },
    {
      id: 4,
      brand: 'Bin Bakar Electronics',
      name: 'Anex Roti Maker',
      image: 'https://i.postimg.cc/bND7T9z2/6eb1e758678a098151394c8387c008cc.png',
      originalPrice: 'RS 86,000',
      price: 'RS 70,000'
    },
    {
      id: 5,
      brand: 'Bin Bakar Electronics',
      name: 'Gree GS-12FTH Split AC',
      image: 'https://i.postimg.cc/jdpGkn53/2cc97d0e172ae783303181ee0ba6e46f.png',
      originalPrice: 'RS 86,000',
      price: 'RS 86,000'
    },
    {
      id: 6,
      brand: 'Bin Bakar Electronics',
      name: 'Gree Air Conditioner',
      image: 'https://i.postimg.cc/mg70xZ1L/123f8e353c2f101176ae5f8fc112aebb.png',
      originalPrice: 'RS 86,000',
      price: 'RS 17,000'
    }
  ];

  return (
    <Box sx={{ p: 3 }}>
      {/* Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 3, alignItems: 'center' }}>
        <Typography variant="h5" component="h2">
          <Box component="span" sx={{ color: 'primary.main' }}>New</Box> Arrivals
        </Typography>
        <Box sx={{ display: 'flex', gap: 1 }}>
          <Typography>End in:</Typography>
          <Typography>08</Typography>
          <Typography>08</Typography>
          <Typography>53</Typography>
        </Box>
      </Box>

      {/* Scrollable Product Container for Mobile */}
      <Box
        sx={{
          display: isMobile ? 'flex' : 'block',
          overflowX: isMobile ? 'auto' : 'visible',
          gap: isMobile ? 2 : 0,
          scrollbarWidth: 'none', // Hide scrollbar for Firefox
          '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome/Safari
          paddingBottom: isMobile ? '10px' : 0, // Space for better UX
        }}
      >
        <Grid container spacing={2} sx={{ flexWrap: isMobile ? 'nowrap' : 'wrap' }}>
          {products.map((product) => (
            <Grid item xs={12} sm={6} md={4} lg={2} key={product.id} sx={{ minWidth: isMobile ? '250px' : 'auto' }}>
              <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                <CardContent sx={{ p: 2, flex: 1 }}>
                  <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                    {product.brand}
                  </Typography>
                  <Typography
                    variant="subtitle2"
                    sx={{
                      height: '40px',
                      overflow: 'hidden',
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      mb: 1
                    }}
                  >
                    {product.name}
                  </Typography>

                  <CardMedia
                    component="img"
                    height="140"
                    image={product.image}
                    alt={product.name}
                    sx={{
                      objectFit: 'contain',
                      my: 2,
                      backgroundColor: '#f5f5f5'
                    }}
                  />

                  <Typography sx={{ mb: 1 }}>
                    <Typography
                      component="span"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                        mr: 1
                      }}
                    >
                      {product.originalPrice}
                    </Typography>
                    <Typography component="span" color="primary" fontWeight="bold">
                      {product.price}
                    </Typography>
                  </Typography>

                  <Button variant="contained" fullWidth sx={{ mt: 'auto', textTransform: 'none' }}>
                    Add to cart
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

export default NewArrivals;
