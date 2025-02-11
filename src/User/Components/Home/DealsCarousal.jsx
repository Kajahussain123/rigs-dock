import React, { useState } from 'react';
import { Typography, Box, Container, Button, Card, CardContent, CardMedia } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';

const DealsSlider = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const products = [
        { id: 1, image: 'https://i.postimg.cc/VkwCR4j7/3d5912af42760e953512d5fc5f05bc51.png', price: 'RS 30,000' },
        { id: 2, image: 'https://i.postimg.cc/mr2FxDpC/7b0e6476f3efe1ff7059b6edf9893613.jpg', price: 'RS 30,000' },
        { id: 3, image: 'https://i.postimg.cc/hGyQKBNw/aeef1e4726a2c32254476682bfd427f1.jpg', price: 'RS 30,000' },
        { id: 4, image: 'https://i.postimg.cc/hGyQKBNw/aeef1e4726a2c32254476682bfd427f1.jpg', price: 'RS 20,000' },
        { id: 5, image: 'https://i.postimg.cc/hGyQKBNw/aeef1e4726a2c32254476682bfd427f1.jpg', price: 'RS 50,000' },
        { id: 6, image: 'https://i.postimg.cc/mr2FxDpC/7b0e6476f3efe1ff7059b6edf9893613.jpg', price: 'RS 30,000' },
    ];

    return (
        <Box sx={{ width: '100%', minHeight: '60vh', background: 'linear-gradient(to bottom,#E7EFF9,#FFFFFF)' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 4 }}>
                    {/* Deal Section */}
                    <Box sx={{ flex: '1 1 30%', minWidth: 250, order: 0 }}> {/* Set order 0 so it's always first */}
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold' }}>
                            DEALS OF <span style={{ color: '#1976d2' }}>THE</span>
                            <br />
                            <span style={{ color: '#1976d2' }}>DAY</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ my: 2 }}>
                            You cannot inspect quality into the product; it is already there.
                            I am not a product of my circumstances. I am a product of my decisions.
                        </Typography>
                        <Button variant="contained" sx={{ textTransform: 'none', borderRadius: 1 }}>
                            View More
                        </Button>
                    </Box>

                    {/* Scrollable Product Section */}
                    <Box
                        sx={{
                            flex: '1 1 70%',
                            overflowX: 'auto',
                            display: 'flex',
                            flexWrap: 'nowrap',
                            gap: 3,
                            padding: '10px 0',
                            scrollSnapType: 'x mandatory',
                            whiteSpace: 'nowrap',
                            maxWidth: '100vw',
                            scrollbarWidth: 'none', // Hide scrollbar for Firefox
                            '&::-webkit-scrollbar': { display: 'none' }, // Hide scrollbar for Chrome/Safari
                            '-webkit-overflow-scrolling': 'touch', // Smooth scrolling on iOS
                            order: 1, // Ensure it appears below the deals section
                        }}
                    >


                        {products.map((product) => (
                            <Card
                                key={product.id}
                                sx={{
                                    minWidth: 280,
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                    borderRadius: 2,
                                    flexShrink: 0,
                                    scrollSnapAlign: 'start',
                                    display: 'inline-flex',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt="Product"
                                    sx={{ objectFit: 'contain', p: 2 }}
                                />
                                <CardContent sx={{ textAlign: 'right' }}>
                                    <Button variant="text" color="primary" sx={{ textTransform: 'none' }}>
                                        Add to cart
                                    </Button>
                                    <Typography variant="body1" color="text.secondary">
                                        {product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
};

export default DealsSlider;
