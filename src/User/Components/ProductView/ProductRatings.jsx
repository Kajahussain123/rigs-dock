import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography, LinearProgress, Stack, Avatar, Card, CardContent, CircularProgress } from "@mui/material";
import { viewProductsById } from "../../../Services/allApi";

const ProductRatings = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const productData = await viewProductsById(productId);
        if (productData && productData.product) {
          setProduct(productData.product); // ✅ Set only `product`, not full response
        } else {
          setError("Product data is missing.");
        }
      } catch (err) {
        setError("Failed to fetch product ratings & reviews.");
      } finally {
        setLoading(false);
      }
    };
    fetchProduct();
  }, [productId]);

  if (loading) return <CircularProgress />;
  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}}>No product found.</Typography>;

  // ✅ Handle missing or undefined values safely
  const totalReviews = product.totalReviews || 0;
  const averageRating = product.averageRating || "0.0";
  const ratingCounts = product.ratingCounts || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 };
  const reviews = product.reviews || [];

  return (
    <Box sx={{ width: "100%", p: 3, borderLeft: "1px solid #ddd" }}>
      <Typography variant="h6" fontWeight="bold" gutterBottom sx={{fontFamily: `"Montserrat", sans-serif`,}}>
        Ratings & Reviews
      </Typography>

      <Stack direction="row" alignItems="center" spacing={1} sx={{ mb: 2 }}>
        <Box
          sx={{
            backgroundColor: "#2E7D32",
            color: "white",
            px: 1.5,
            py: 0.5,
            borderRadius: 1,
            fontWeight: "bold",
            fontSize: "1.2rem",
            fontFamily: `"Montserrat", sans-serif`,
          }}
        >
          {averageRating} ★
        </Box>
        <Typography variant="body1" sx={{ fontWeight: "bold", color: "#666", fontFamily: `"Montserrat", sans-serif`,}}>
          {totalReviews.toLocaleString()} Ratings & Reviews
        </Typography>
      </Stack>

      {Object.keys(ratingCounts)
        .reverse()
        .map((rating) => (
          <Stack key={rating} direction="row" alignItems="center" spacing={1} sx={{ mb: 1 }}>
            <Typography variant="body2" sx={{ minWidth: "40px", fontWeight: "bold",fontFamily: `"Montserrat", sans-serif`, }}>
              {rating} ★
            </Typography>
            <LinearProgress
              variant="determinate"
              value={(ratingCounts[rating] / totalReviews) * 100 || 0}
              sx={{ flex: 1, height: 8, borderRadius: 5 }}
              color="success"
            />
            <Typography variant="body2" sx={{ minWidth: "40px", textAlign: "right",fontFamily: `"Montserrat", sans-serif`, }}>
              {ratingCounts[rating] || 0}
            </Typography>
          </Stack>
        ))}

      <Typography variant="h6" fontWeight="bold" sx={{ mt: 3 ,fontFamily: `"Montserrat", sans-serif`,}}>
        Customer Reviews
      </Typography>

      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <Card key={index} sx={{ mt: 2, p: 2, boxShadow: "none", border: "1px solid #ddd" }}>
            <CardContent>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Avatar sx={{ bgcolor: "#2E7D32", color: "white",fontFamily: `"Montserrat", sans-serif`, }}>
                  {review.user.email.charAt(0).toUpperCase()}
                </Avatar>
                <Stack>
                  <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} fontWeight="bold">{review.user.email}</Typography>
                  <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2" color="text.secondary">
                    {new Date(review.createdAt).toLocaleDateString()}
                  </Typography>
                </Stack>
              </Stack>

              <Box
                sx={{
                  backgroundColor: "#2E7D32",
                  color: "white",
                  display: "inline-block",
                  px: 1,
                  py: 0.3,
                  borderRadius: 1,
                  fontWeight: "bold",
                  mt: 1,
                  fontFamily: `"Montserrat", sans-serif`,
                }}
              >
                {review.rating} ★
              </Box>

              <Typography variant="body1" sx={{ mt: 1 ,fontFamily: `"Montserrat", sans-serif`,}}>
                {review.review}
              </Typography>

              {review.images.length > 0 && (
                <Stack direction="row" spacing={1} mt={1}>
                  {review.images.map((img, i) => (
                    <Box
                      key={i}
                      component="img"
                      src={img}
                      alt="Review Image"
                      sx={{ width: 60, height: 60, borderRadius: 1, cursor: "pointer" }}
                    />
                  ))}
                </Stack>
              )}
            </CardContent>
          </Card>
        ))
      ) : (
        <Typography variant="body1" sx={{ mt: 2, color: "text.secondary",fontFamily: `"Montserrat", sans-serif`, }}>
          No reviews yet.
        </Typography>
      )}
    </Box>
  );
};

export default ProductRatings;
