import React, { useEffect, useState } from 'react';
import { Typography, Box, Container, Button, Card, CardContent, CardMedia, CircularProgress, Snackbar } from '@mui/material';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { addToCart, dealOfTheDay } from '../../../Services/allApi';
import placeholder from "../../../Assets/PlacHolder.png"
import { useNavigate } from 'react-router-dom';
import LoginModal from '../LoginModel';

const DealsSlider = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    const BASE_URL = "https://rigsdock.com/uploads/";

    const [deals, setDeals] = useState([]);
    const [loading, setLoading] = useState(true);
    const [successMessage, setSuccessMessage] = useState("");
    const navigate = useNavigate()
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
                <Box sx={{ display: 'flex', flexDirection: isMobile ? 'column' : 'row', alignItems: 'center', gap: 4 }}>
                    {/* Deal Section */}
                    <Box sx={{ flex: '1 1 30%', minWidth: isMobile ? '100%' : 250, order: 0 }}>
                        <Typography variant="h4" component="h2" sx={{ fontWeight: 'bold', fontFamily: `"Montserrat", sans-serif` }}>
                            DEALS OF <span style={{ color: '#1976d2' }}>THE</span>
                            <br />
                            <span style={{ color: '#1976d2' }}>DAY</span>
                        </Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ my: 2, fontFamily: `"Montserrat", sans-serif` }}>
                            Limited time offers on top brands. Don't miss these exclusive deals!
                        </Typography>
                        {!isMobile && (
                            <Button onClick={handleViewMore} variant="contained" sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: 'none', borderRadius: 1 }}>
                                View More
                            </Button>
                        )}
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
                            width: '100%',
                            scrollbarWidth: 'none',
                            '&::-webkit-scrollbar': { display: 'none' },
                            '-webkit-overflow-scrolling': 'touch',
                            order: 1,
                        }}
                    >
                        {deals.map((deal) => {
                            const discountPercentage = calculateDiscountPercentage(deal.product.price, deal.offerPrice);
                            
                            return (
                                <Card
                                    key={deal._id}
                                    sx={{
                                        width: isMobile ? 300 : 400,
                                        boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                                        borderRadius: 2,
                                        flexShrink: 0,
                                        scrollSnapAlign: 'start',
                                        display: 'flex',
                                        flexDirection: 'row',
                                        height: 200,
                                        position: 'relative',
                                        overflow: 'visible', // Ensure circle is fully visible
                                    }}
                                >
                                    {/* Discount Percentage Circle - Moved to left side */}
                                    <Box sx={{
                                        position: 'absolute',
                                        top: -10,
                                        left: -0,
                                        width: 60,
                                        height: 60,
                                        borderRadius: '50%',
                                        backgroundColor: '#1976d2',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        color: 'white',
                                        fontWeight: 'bold',
                                        fontSize: '0.7rem',
                                        zIndex: 1,
                                        boxShadow: '0 2px 5px rgba(0,0,0,0.2)'
                                    }}>
                                        {`${discountPercentage}% OFF`}
                                    </Box>

                                    {/* Image on the left - Adjusted to account for circle */}
                                    <Box sx={{
                                        width: '40%',
                                        height: '100%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        justifyContent: 'center',
                                        p: 1,
                                        ml: 2 // Add margin to prevent overlap with circle
                                    }}>
                                        <CardMedia
                                            component="img"
                                            sx={{
                                                height: 'auto',
                                                maxHeight: '100%',
                                                width: 'auto',
                                                maxWidth: '100%',
                                                objectFit: 'contain'
                                            }}
                                            // image={placeholder}
                                            image={`https://rigsdock.com/uploads/${deal.product.images?.[0]}`}
                                            alt={deal.product.name}
                                        />
                                    </Box>

                                    {/* Content on the right */}
                                    <Box sx={{
                                        width: '60%',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                        p: 2
                                    }}>
                                        <Box>
                                            <Typography
                                                sx={{
                                                    fontFamily: `"Montserrat", sans-serif`,
                                                    fontWeight: 'bold',
                                                    fontSize: isMobile ? '0.9rem' : '1rem'
                                                }}
                                                variant="body1"
                                                color="text.primary"
                                                noWrap
                                            >
                                                {deal.product.name}
                                            </Typography>
                                            <Typography
                                                sx={{
                                                    fontFamily: `"Montserrat", sans-serif`,
                                                    fontSize: '0.8rem',
                                                    color: 'text.secondary',
                                                    mt: 0.5
                                                }}
                                                variant="body2"
                                            >
                                                Brand: {deal.product.brand}
                                            </Typography>
                                            <Box sx={{ display: 'flex', alignItems: 'center', mt: 1 }}>
                                                <Typography
                                                    sx={{
                                                        fontFamily: `"Montserrat", sans-serif`,
                                                        fontSize: isMobile ? '0.9rem' : '1rem',
                                                        fontWeight: 'bold',
                                                        color: 'primary.main'
                                                    }}
                                                >
                                                    ₹{deal.offerPrice}
                                                </Typography>
                                                <Typography
                                                    sx={{
                                                        fontFamily: `"Montserrat", sans-serif`,
                                                        fontSize: '0.8rem',
                                                        color: 'text.secondary',
                                                        textDecoration: 'line-through',
                                                        ml: 1
                                                    }}
                                                >
                                                    ₹{deal.product.price}
                                                </Typography>
                                            </Box>
                                            <Typography
                                                sx={{
                                                    fontFamily: `"Montserrat", sans-serif`,
                                                    fontSize: '0.7rem',
                                                    color: 'success.main',
                                                    mt: 0.5
                                                }}
                                            >
                                                You save: ₹{deal.product.price - deal.offerPrice}
                                            </Typography>
                                        </Box>
                                        <Box sx={{ textAlign: 'right' }}>
                                            <Button
                                                onClick={(e) => handleAddToCart(e, deal.product._id)}
                                                variant="text"
                                                color="primary"
                                                size="small"
                                                sx={{
                                                    fontFamily: `"Montserrat", sans-serif`,
                                                    textTransform: 'none',
                                                    whiteSpace: 'nowrap',
                                                    fontSize: isMobile ? '0.8rem' : '0.9rem',
                                                    px: 2,
                                                    py: 1
                                                }}
                                            >
                                                Add to cart
                                            </Button>
                                        </Box>
                                    </Box>
                                </Card>
                            );
                        })}
                    </Box>
                </Box>

                {/* View More button for mobile */}
                {isMobile && (
                    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                        <Button
                            onClick={handleViewMore}
                            variant="contained"
                            sx={{
                                fontFamily: `"Montserrat", sans-serif`,
                                textTransform: 'none',
                                borderRadius: 1,
                                width: '50%'
                            }}
                        >
                            View More
                        </Button>
                    </Box>
                )}
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