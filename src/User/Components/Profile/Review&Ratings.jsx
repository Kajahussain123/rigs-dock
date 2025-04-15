import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Box,
  Paper,
  Typography,
  Grid,
  CardMedia,
  Button,
  CircularProgress,
} from "@mui/material";
import { CheckCircle } from "@mui/icons-material";
import { getUserReviews } from "../../../Services/allApi";
import placeholder from "../../../Assets/PlacHolder.png"



const MyReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const userId = localStorage.getItem("userId");


  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getUserReviews(userId);
        console.log("Fetched reviews:", data); // Debugging line
        setReviews(Array.isArray(data) ? data : []); // Ensure it's an array
      } catch (error) {
        console.error("Error fetching reviews", error);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);


  if (loading) {
    return <CircularProgress />;
  }

  return (
    <Paper elevation={2} sx={{ p: 3, margin: "auto", }}>
      <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" mb={2}>
        My Reviews ({reviews.length})
      </Typography>

      {reviews.length === 0 ? (
        <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}}>No reviews found.</Typography>
      ) : (
        reviews.map((review) => (
          <Box
            key={review._id}
            sx={{
              display: "flex",
              flexDirection: "column",
              py: 2,
              borderBottom: "1px solid #e0e0e0",
            }}
          >
            <Grid container spacing={2}>
              <Grid item xs={3} sm={2}>
                {review.images.length > 0 ? (
                  <CardMedia
                  component="img"
                  image={`https://rigsdock.com/uploads/${review.images?.[0]}`}
                  sx={{
                    width: "100%",
                    height: "auto",
                    maxHeight: "80px",
                    objectFit: "contain",
                  }}
                />
                
                ) : (
                  <Typography>No Image</Typography>
                )}
              </Grid>

              <Grid item xs={9} sm={10}>
                <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2" color="textSecondary">
                  {review.product.name} - ₹{review.product.price}
                </Typography>

                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Box
                    sx={{
                      bgcolor: "green",
                      color: "white",
                      px: 1,
                      py: 0.3,
                      borderRadius: 1,
                      fontSize: "0.875rem",
                      fontWeight: "bold",
                      fontFamily: `"Montserrat", sans-serif`,
                    }}
                  >
                    {review.rating} ★
                  </Box>
                </Box>

                <Typography variant="body2" sx={{fontFamily: `"Montserrat", sans-serif`, mt: 0.5 }}>
                  {review.review}
                </Typography>

                <Typography
                  variant="body2"
                  color="textSecondary"
                  sx={{fontFamily: `"Montserrat", sans-serif`, display: "flex", alignItems: "center", mt: 1 }}
                >
                  Verified Buyer <CheckCircle fontSize="small" sx={{fontFamily: `"Montserrat", sans-serif`, ml: 0.5, color: "gray" }} />
                  &nbsp; {new Date(review.createdAt).toDateString()}
                </Typography>

                {/* <Box sx={{ display: "flex", mt: 1, gap: 2 }}>
                  <Button  variant="text" sx={{fontFamily: `"Montserrat", sans-serif`, color: "#0066cc", fontWeight: "bold", textTransform: "none" }}>
                    Edit
                  </Button>
                  <Button variant="text" sx={{fontFamily: `"Montserrat", sans-serif`, color: "#0066cc", fontWeight: "bold", textTransform: "none" }}>
                    Delete
                  </Button>
                  <Button variant="text" sx={{ fontFamily: `"Montserrat", sans-serif`,color: "#0066cc", fontWeight: "bold", textTransform: "none" }}>
                    Share
                  </Button>
                </Box> */}
              </Grid>
            </Grid>
          </Box>
        ))
      )}
    </Paper>
  );
};

export default MyReviews;
