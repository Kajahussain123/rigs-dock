import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  Container,
  Grid,
  Menu,
  MenuItem,
  Stack,
  Toolbar,
  Typography
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

const NavMenuItem = ({ title }) => {
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  return (
    <Box>
      <Button
        color="inherit"
        endIcon={<KeyboardArrowDownIcon />}
        onClick={(e) => setAnchorEl(e.currentTarget)}
      >
        {title}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={() => setAnchorEl(null)}
      >
        <MenuItem onClick={() => setAnchorEl(null)}>Option 1</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Option 2</MenuItem>
        <MenuItem onClick={() => setAnchorEl(null)}>Option 3</MenuItem>
      </Menu>
    </Box>
  );
};

const ImageCarousel = ({ images }) => {
  const [currentImage, setCurrentImage] = useState(0);

  const nextImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev + 1) % images.length);
  };

  const prevImage = (e) => {
    e.stopPropagation();
    setCurrentImage((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <CardMedia
        component="img"
        height="200"
        image={images[currentImage]}
        alt="Car Image"
        sx={{ objectFit: 'cover' }}
      />
      
      {/* Navigation Arrows */}
      <Button
        sx={{
          position: 'absolute',
          left: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          minWidth: '36px',
          p: 0,
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' }
        }}
        onClick={prevImage}
      >
        <ChevronLeftIcon />
      </Button>
      
      <Button
        sx={{
          position: 'absolute',
          right: 0,
          top: '50%',
          transform: 'translateY(-50%)',
          minWidth: '36px',
          p: 0,
          color: 'white',
          '&:hover': { backgroundColor: 'rgba(0,0,0,0.2)' }
        }}
        onClick={nextImage}
      >
        <ChevronRightIcon />
      </Button>

      {/* Dots Navigation */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 8,
          left: 0,
          right: 0,
          display: 'flex',
          justifyContent: 'center',
          gap: 1
        }}
      >
        {images.map((_, index) => (
          <Box
            key={index}
            onClick={(e) => {
              e.stopPropagation();
              setCurrentImage(index);
            }}
            sx={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              backgroundColor: index === currentImage ? 'white' : 'rgba(28, 9, 9, 0.91)',
              cursor: 'pointer',
              transition: 'background-color 0.3s'
            }}
          />
        ))}
      </Box>
    </Box>
  );
};

const CarRentalPage = () => {
  const cars = [
    {
      id: 1,
      name: 'MINI Cooper',
      price: 'RS 30,000',
      perDay: 'Per /day',
      images: [
        'https://i.postimg.cc/yxWw2Fct/43f38368cb9b512e83f5cca9215559eb.jpg',
        'https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png',
        '/api/placeholder/400/300'
      ]
    },
    {
        id: 2,
        name: 'MINI Cooper',
        price: 'RS 30,000',
        perDay: 'Per /day',
        images: [
          'https://i.postimg.cc/yxWw2Fct/43f38368cb9b512e83f5cca9215559eb.jpg',
          'https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png',
          '/api/placeholder/400/300'
        ]
      },
      {
        id: 3,
        name: 'MINI Cooper',
        price: 'RS 30,000',
        perDay: 'Per /day',
        images: [
          'https://i.postimg.cc/yxWw2Fct/43f38368cb9b512e83f5cca9215559eb.jpg',
          'https://i.postimg.cc/2ySgZgwP/85c8c3f8948346cfb75dc8c7c996b6d7.png',
          '/api/placeholder/400/300'
        ]
      },
    
    // ... more cars with similar structure
  ];

  return (
    <Box>
      {/* Navigation Bar */}
      <AppBar position="static" color="transparent" elevation={0}>
        <Toolbar>
          <Stack direction="row" spacing={2} sx={{ width: '100%', justifyContent: 'center' }}>
            <NavMenuItem title="Rental Services" />
            <NavMenuItem title="Second Hand" />
            <NavMenuItem title="Grocery" />
            <NavMenuItem title="Fashion" />
            <NavMenuItem title="Electronics" />
          </Stack>
        </Toolbar>
      </AppBar>

      {/* Main Content */}
      <Container sx={{ py: 4 }}>
        {/* Category Header */}
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Car
          </Typography>
          <Typography variant="subtitle1" color="text.secondary">
            Premium Vehicle
          </Typography>
        </Box>

        {/* Products Grid */}
        <Grid container spacing={3}>
          {cars.map((car) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={car.id}>
              <Card sx={{ 
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                '&:hover': {
                  boxShadow: 6
                }
              }}>
                <ImageCarousel images={car.images} />
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h6">
                      {car.name}
                    </Typography>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Typography variant="h6" color="primary">
                        {car.price}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {car.perDay}
                      </Typography>
                    </Box>
                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                      <Button
                        variant="outlined"
                        fullWidth
                        sx={{
                          borderColor: '#e0e0e0',
                          color: 'text.primary',
                          '&:hover': {
                            borderColor: 'primary.main'
                          }
                        }}
                      >
                        Add to cart
                      </Button>
                      <Button
                        variant="contained"
                        fullWidth
                        sx={{
                          bgcolor: 'primary.main',
                          '&:hover': {
                            bgcolor: 'primary.dark'
                          }
                        }}
                      >
                        Book Now
                      </Button>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* See More Button */}
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          <Button color="primary">
            See More
          </Button>
        </Box>
      </Container>
    </Box>
  );
};

export default CarRentalPage;