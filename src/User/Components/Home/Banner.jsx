import React from 'react';
import { Typography, Box, Button, Container } from '@mui/material';

const BannerSection = () => {
    return (
        <Box
            sx={{
                background: 'linear-gradient(to right, #f5f7ff, #ffffff)',
                padding: '40px 0',
                borderRadius: '8px',
                overflow: 'hidden',
                position: 'relative'
            }}
        >
            <Container maxWidth="lg">
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column-reverse', md: 'row' },  // Reverse order on mobile
                        justifyContent: 'space-between',
                        alignItems: 'center',
                        position: 'relative',
                        gap: 4
                    }}
                >
                    {/* Left Content */}
                    <Box sx={{ maxWidth: { xs: '100%', md: '450px' }, zIndex: 1, textAlign: { xs: 'center', md: 'left' } }}>
                        <Typography
                            component="h1"
                            sx={{
                                fontSize: { xs: '28px', md: '40px' },
                                fontWeight: 'bold',
                                marginBottom: 2,
                                lineHeight: 1.2
                            }}
                        >
                            Your One-Stop Online Shopping Destination
                        </Typography>
                        <Typography
                            sx={{
                                color: 'text.secondary',
                                marginBottom: 3,
                                fontSize: '16px'
                            }}
                        >
                            Discover A World Of Endless Possibilities With Our E-Commerce Platform. From Electronics To
                            Fashion, Groceries To Home Essentials, Find Everything You Need At Unbeatable Prices—All In
                            One Place!
                        </Typography>
                        <Button
                            variant="contained"
                            sx={{
                                backgroundColor: '#1976d2',
                                color: 'white',
                                padding: '10px 24px',
                                borderRadius: '4px',
                                textTransform: 'none',
                                '&:hover': {
                                    backgroundColor: '#1565c0'
                                }
                            }}
                        >
                            View More
                        </Button>
                    </Box>

                    {/* Right Content - Single Product Group Image */}
                    <Box
                        sx={{
                            position: 'relative',
                            flexGrow: 1,
                            display: 'block',
                            textAlign: 'center',  // Center the image on mobile
                            width: { xs: '100%', md: 'auto' }  // Full width on mobile
                        }}
                    >
                        {/* Main Product Group Image */}
                        <Box
                            component="img"
                            src="https://i.postimg.cc/VNFKYdFR/347c1b49d6d80e0133ab48e92d55966a.png"  // Replace with your actual image path
                            alt="Products Showcase"
                            sx={{
                                maxWidth: '100%',  // Full width on mobile
                                height: 'auto',
                                objectFit: 'contain'
                            }}
                        />

                        {/* Discount Badge */}
                        <Box
                            sx={{
                                position: 'absolute',
                                top: '20px',
                                right: '20px',
                                backgroundColor: '#4caf50',
                                color: 'white',
                                borderRadius: '50%',
                                width: '80px',
                                height: '80px',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                flexDirection: 'column',
                                zIndex: 2
                            }}
                        >
                            <Typography sx={{ fontWeight: 'bold', fontSize: '24px' }}>
                                50%
                            </Typography>
                            <Typography sx={{ fontSize: '14px' }}>Off</Typography>
                        </Box>
                    </Box>

                </Box>
            </Container>
        </Box>
    );
};

export default BannerSection;