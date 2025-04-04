import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Button, Card, CardMedia, CircularProgress, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { addToCart, dealOfTheDay } from '../../../Services/allApi';
import { useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModel';

const DealsSlider = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const BASE_URL = "https://rigsdock.com/uploads/";

    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate();
    const [error, setError] = useState(null);
    const [isLoginOpen, setIsLoginOpen] = useState(false);

    const openLoginModal = () => {
        setIsLoginOpen(true);
    };

    const closeLoginModal = () => {
        setIsLoginOpen(false);
    };

    const handleAddToCart = async (e, productId) => {
        e.stopPropagation();
        const userId = localStorage.getItem("userId");
        if (!userId) {
            openLoginModal();
            return;
        }

        try {
            await addToCart(userId, productId, 1);
            setSuccessMessage("Product added to cart successfully!");
        } catch (error) {
            console.error("Error adding product to cart", error);
            alert("Failed to add product to cart. Try again.");
        }
    };

    const handleViewMore = () => {
        navigate("/dealoftheday");
    };

    const calculateDiscountPercentage = (originalPrice, offerPrice) => {
        return Math.round(((originalPrice - offerPrice) / originalPrice) * 100);
    };

    useEffect(() => {
        const fetchDeals = async () => {
            try {
                const response = await dealOfTheDay();
                setDeals(response);
            } catch (err) {
                console.error("Failed to fetch deals", err);
                setError("Failed to load deals. Please try again.");
            } finally {
                setLoading(false);
            }
        };
        fetchDeals();
    }, []);

    if (loading) return <CircularProgress sx={{ display: "block", mx: "auto", my: 4 }} />;
    if (error) return <Typography color="error" sx={{ textAlign: "center", my: 4 }}>{error}</Typography>;

    return (
        <Box sx={{ width: '100%', minHeight: '40vh', background: 'linear-gradient(to bottom,#E7EFF9,#FFFFFF)' }}>
            <Container maxWidth="lg" sx={{ py: 4 }}>
                {/* Entire content is now in a single scrollable container */}
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        gap: 3,
                        overflowX: 'auto',
                        scrollSnapType: 'x mandatory',
                        scrollbarWidth: 'none',
                        '&::-webkit-scrollbar': { display: 'none' },
                        '-webkit-overflow-scrolling': 'touch',
                        pb: 2
                    }}
                >
                    {/* Left side image (now part of the scrollable items) */}
                    <Box
                        sx={{
                            flexShrink: 0,
                            scrollSnapAlign: 'start',
                            width: isMobile ? 150 : 250,
                            height: isMobile ? 150 : 200,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            borderRadius: 2,
                            overflow: 'hidden',
                            position: 'relative'
                        }}
                    >
                        <CardMedia
                            component="img"
                            sx={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover'
                            }}
                            image="https://i.postimg.cc/zX1NtW5y/Frame-1000003089.png"
                            alt="Deal of the Day"
                        />
                    </Box>

                    {/* Deal products - UPDATED CARD DESIGN */}
                    {deals.map((deal) => {
                        const discountPercentage = calculateDiscountPercentage(deal.product.price, deal.offerPrice);

                        return (
                            <Card
                                key={deal._id}
                                sx={{
                                    width: isMobile ? '90vw' : 550,
                                    height: isMobile ? 180 : 180,
                                    boxShadow: '0 4px 8px rgba(0,0,0,0.05)',
                                    borderRadius: 2,
                                    flexShrink: 0,
                                    scrollSnapAlign: 'start',
                                    display: 'flex',
                                    flexDirection: 'row',
                                    position: 'relative',
                                    overflow: 'visible',
                                    backgroundColor: '#ffffff',
                                    border: '1px solid #f0f0f0',
                                    minWidth: isMobile ? 280 : 550,
                                }}
                                onClick={() => navigate(`/single/${deal.product._id}`)}
                            >
                                {/* Product Image (Left Side) */}
                                <Box sx={{
                                    width: '40%',
                                    height: '100%',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    padding: isMobile ? 1 : 2,
                                    backgroundColor: '#f9f9f9',
                                }}>
                                    <CardMedia
                                        component="img"
                                        sx={{
                                            height: 'auto',
                                            maxHeight: '90%',
                                            width: 'auto',
                                            maxWidth: '90%',
                                            objectFit: 'contain'
                                        }}
                                        image={`${BASE_URL}${deal.product.images?.[0]}`}
                                        alt={deal.product.name}
                                    />
                                </Box>

                                {/* Content (Right Side) */}
                                <Box sx={{
                                    width: '60%',
                                    display: 'flex',
                                    flexDirection: 'column',
                                    padding: isMobile ? 1.5 : 2,
                                }}>
                                    {/* Product Name */}
                                    <Typography
                                        sx={{
                                            fontFamily: `"Montserrat", sans-serif`,
                                            fontWeight: 'bold',
                                            fontSize: isMobile ? '1rem' : '1.5rem',
                                            marginBottom: 0.5,
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis'
                                        }}
                                    >
                                        {deal.product.name}
                                    </Typography>

                                    {/* Brand */}
                                    <Typography
                                        sx={{
                                            fontFamily: `"Montserrat", sans-serif`,
                                            fontSize: isMobile ? '0.8rem' : '1rem',
                                            color: '#666',
                                        }}
                                    >
                                        Brand: {deal.product.brand}
                                    </Typography>

                                    {/* Pricing */}
                                    <Box sx={{ 
                                        display: 'flex', 
                                        alignItems: 'center', 
                                        mt: isMobile ? 1 : 2,
                                        mb: 0.5
                                    }}>
                                        <Typography
                                            sx={{
                                                fontFamily: `"Montserrat", sans-serif`,
                                                fontSize: isMobile ? '0.9rem' : '1.2rem',
                                                color: '#888',
                                                textDecoration: 'line-through',
                                            }}
                                        >
                                            ₹{deal.product.price}
                                        </Typography>
                                        <Typography
                                            sx={{
                                                fontFamily: `"Montserrat", sans-serif`,
                                                fontSize: isMobile ? '1.1rem' : '1.5rem',
                                                fontWeight: 'bold',
                                                color: '#0066cc',
                                                ml: 2
                                            }}
                                        >
                                            ₹{deal.offerPrice}
                                        </Typography>
                                    </Box>

                                    {/* View More Button */}
                                    <Box sx={{ 
                                        display: 'flex',
                                        justifyContent: 'flex-end',
                                        mt: 'auto'
                                    }}>
                                        <Button
                                            variant="text"
                                            sx={{
                                                fontFamily: `"Montserrat", sans-serif`,
                                                color: '#0066cc',
                                                textTransform: 'none',
                                                fontSize: isMobile ? '0.8rem' : '1rem',
                                                fontWeight: 'medium',
                                                padding: 0,
                                            }}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                navigate(`/single/${deal.product._id}`);
                                            }}
                                        >
                                            View more
                                        </Button>
                                    </Box>
                                </Box>

                                {/* Discount Tag (Top Right) */}
                                <Box
                                    sx={{
                                        position: 'absolute',
                                        top: 0,
                                        right: 0,
                                        backgroundColor: '#cc0000',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        padding: isMobile ? '10px 8px' : '15px 10px',
                                        clipPath: "polygon(0 0, 100% 0, 100% 80%, 50% 100%, 0 80%)",
                                        width: isMobile ? 60 : 80,
                                        height: isMobile ? 60 : 80,
                                        display: 'flex',
                                        flexDirection: 'column',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                    }}
                                >
                                    <Typography
                                        sx={{
                                            fontSize: isMobile ? '1rem' : '1.5rem',
                                            fontWeight: 'bold',
                                            fontFamily: `"Montserrat", sans-serif`,
                                        }}
                                    >
                                        {discountPercentage}%
                                    </Typography>
                                    <Typography
                                        sx={{
                                            fontSize: isMobile ? '0.7rem' : '0.9rem',
                                            fontWeight: 'medium',
                                            fontFamily: `"Montserrat", sans-serif`,
                                        }}
                                    >
                                        off
                                    </Typography>
                                </Box>
                            </Card>
                        );
                    })}
                </Box>
            </Container>

            {isLoginOpen && <LoginModal show={isLoginOpen} handleClose={closeLoginModal} />}

            <Snackbar
                open={!!successMessage}
                autoHideDuration={3000}
                onClose={() => setSuccessMessage("")}
                message={successMessage}
                anchorOrigin={{ vertical: "top", horizontal: "right" }}
            />
        </Box>
    );
};

export default DealsSlider;