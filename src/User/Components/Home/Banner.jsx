import React from 'react';
import { Box, useTheme, useMediaQuery } from '@mui/material';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import BannerImg1 from "../../../Assets/BannerImg2.jpg";
import BannerImg2 from "../../../Assets/BannerImg3.jpg";
import BannerImg3 from "../../../Assets/BannerImg4.jpg";
import BannerImg4 from "../../../Assets/BannerImg5.jpg";
import BannerImg5 from "../../../Assets/BannerImg6.jpg";
import BannerImg6 from "../../../Assets/BannerImg7.jpg";
import BannerImg7 from "../../../Assets/BannerImg8.jpg";

const BannerSection = () => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const bannerImages = [
        { id: 1, src: BannerImg1, alt: "Banner 1" },
        { id: 2, src: BannerImg2, alt: "Banner 2" },
        { id: 3, src: BannerImg3, alt: "Banner 3" },
        { id: 4, src: BannerImg4, alt: "Banner 4" },
        { id: 5, src: BannerImg5, alt: "Banner 5" },
        { id: 6, src: BannerImg6, alt: "Banner 6" },
        { id: 7, src: BannerImg7, alt: "Banner 7" },
    ];

    const carouselHeight = isMobile ? '23vh' : '500px';

    return (
        <Box sx={{
            width: '100%',
            height: carouselHeight,
            overflow: 'hidden',
            position: 'relative',
        }}>
            <Carousel
                autoPlay
                infiniteLoop
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
                            position: 'relative',
                        }}
                    >
                        <img
                            src={image.src}
                            alt={image.alt}
                            style={{
                                width: '100%',
                                height: '100%',
                                objectFit: isMobile ? 'contain' : 'cover',
                                objectPosition: 'center',
                                display: 'block',
                            }}
                        />
                    </Box>
                ))}
            </Carousel>
        </Box>
    );
};

export default BannerSection;
