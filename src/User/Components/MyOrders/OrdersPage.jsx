import React, { useState } from 'react';
import { 
  Box, 
  Container, 
  TextField, 
  Button, 
  Paper, 
  Typography, 
  InputAdornment,
  Grid,
  CardMedia
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const MyOrdersPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Sample orders data
  const orders = [
    {
      id: 1,
      productName: 'Mouse',
      price: 450,
      status: 'Delivered',
      image: '/mouse-image.jpg' // Replace with actual image path
    },
    {
      id: 2,
      productName: 'Mouse',
      price: 450,
      status: 'Delivered',
      image: '/mouse-image.jpg' // Replace with actual image path
    }
  ];
  
  const handleSearch = (e) => {
    e.preventDefault();
    console.log('Searching for:', searchQuery);
  };
  
  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      {/* Search Bar */}
      <Box 
        component="form" 
        onSubmit={handleSearch}
        sx={{ 
          display: 'flex', 
          mb: 3, 
          gap: 2,
          alignItems: 'center'
        }}
      >
        <TextField
          fullWidth
          placeholder="Search for orders here.."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          variant="outlined"
          sx={{ 
            bgcolor: 'white',
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              boxShadow: '0px 1px 3px rgba(0, 0, 0, 0.1)'
            }
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon color="action" />
              </InputAdornment>
            ),
          }}
        />
        <Button 
          type="submit"
          variant="contained"
          sx={{ 
            bgcolor: '#0066cc', 
            borderRadius: 1,
            px: 4,
            py: 1.5,
            fontSize: '1rem',
            textTransform: 'none',
            boxShadow: 2
          }}
        >
          Search
        </Button>
      </Box>
      
      {/* Orders List */}
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
        {orders.map((order) => (
          <Paper 
            key={order.id} 
            elevation={1}
            sx={{ 
              p: 3, 
              borderRadius: 2,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between'
            }}
          >
            <Grid container alignItems="center" spacing={2}>
              <Grid item xs={12} sm={2} md={1.5}>
                <Box 
                  sx={{ 
                    width: 80, 
                    height: 80, 
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center'
                  }}
                >
                  <CardMedia
                    component="img"
                    sx={{ 
                      width: '100%', 
                      height: '100%', 
                      objectFit: 'contain' 
                    }}
                    image={order.image}
                    alt={order.productName}
                    onError={(e) => {
                      e.target.style.display = 'none';
                    }}
                  />
                </Box>
              </Grid>
              
              <Grid item xs={12} sm={4} md={5}>
                <Typography variant="body1" fontWeight="medium">
                  {order.productName}
                </Typography>
              </Grid>
              
              <Grid item xs={6} sm={3} md={2.5} textAlign="center">
                <Typography variant="body1" fontWeight="medium">
                ₹ {order.price}
                </Typography>
              </Grid>
              
              <Grid item xs={6} sm={3} md={3} textAlign="center">
                <Typography 
                  variant="body1" 
                  fontWeight="medium" 
                  sx={{ 
                    color: order.status === 'Delivered' ? 'green' : 'inherit'
                  }}
                >
                  {order.status}
                </Typography>
              </Grid>
            </Grid>
          </Paper>
        ))}
      </Box>
    </Container>
  );
};

export default MyOrdersPage;
