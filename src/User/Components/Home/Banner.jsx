import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImg1 from "../../../Assets/BannerImg2.jpg";
import BannerImg2 from "../../../Assets/BannerImg3.jpg";
import BannerImg3 from "../../../Assets/BannerImg4.webp";
import BannerImg4 from "../../../Assets/BannerImg5.jpg";
import BannerImg5 from "../../../Assets/BannerImg6.jpg";


const BannerSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
    
    // Array of banner images
    const bannerImages = [
        { id: 1, src: BannerImg1, alt: "Banner 1" },
        { id: 2, src: BannerImg2, alt: "Banner 2" },
        { id: 3, src: BannerImg3, alt: "Banner 3" },
        { id: 4, src: BannerImg4, alt: "Banner 4" },
        { id: 5, src: BannerImg5, alt: "Banner 5" },
    ];

    // Calculate height based on screen size
    const carouselHeight = isMobile ? '250px' : '500px';

    return (
        <Box sx={{ 
            width: '100%',
            margin: 0,
            padding: 0,
            height: carouselHeight,
            overflow: 'hidden',
            position: 'relative'
        }}>
            <Carousel
                autoPlay={true}
                infiniteLoop={true}
                showThumbs={false}
                showStatus={false}
                interval={5000}
                transitionTime={500}
                dynamicHeight={false}
            >
                {bannerImages.map((image) => (
                    <Box 
                        key={image.id} 
                        sx={{ 
                            width: '100%',
                            height: carouselHeight,
                            position: 'relative'
                        }}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: 'cover',
                                objectPosition: 'center',
                                display: 'block' // Ensures no extra space below image
                            }}
                        />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default BannerSection;