import React, { useState, useEffect } from "react";
import { Box, Typography, TextField, Button, IconButton, Paper, CardMedia, Alert, CircularProgress } from "@mui/material";
import { PhotoCamera, Close, Star, StarBorder } from "@mui/icons-material";
import { addReviews, viewProductsById } from "../../../Services/allApi";
import { useParams } from "react-router-dom";
import placeholder from "../../../Assets/PlacHolder.png"

const ProductReview = ({ productId: propProductId, orderId: propOrderId }) => {
  // Get productId and orderId from props or URL params as fallback
  const { productId: paramProductId, orderId: paramOrderId } = useParams();
  const productId = propProductId || paramProductId;
  const orderId = propOrderId || paramOrderId;
  
  const [rating, setRating] = useState(0);
  const [review, setReview] = useState({ title: "", description: "" });
  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [imageFile, setImageFile] = useState(null);
  const [product, setProduct] = useState(null);
  const [productLoading, setProductLoading] = useState(true);
  const userId = localStorage.getItem("userId");

  // Debug logs for component props
  useEffect(() => {
    console.log("ProductReview component mounted with:", { 
      productId, 
      orderId,
      userId 
    });
    
    if (!productId) {
      setError("Product ID is missing. Cannot submit review.");
    }
    
    if (!orderId) {
      setError("Order ID is missing. Cannot submit review.");
    }
    
    if (!userId) {
      setError("User ID is missing. Please log in to submit a review.");
    }
  }, [productId, orderId, userId]);

  // Fetch product data
  useEffect(() => {
    const fetchProduct = async () => {
      if (!productId) return;

      try {
        console.log("Fetching product with ID:", productId);
        const response = await viewProductsById(productId);
        console.log("Product data:", response.product);
        setProduct(response.product);
      } catch (err) {
        console.error("Failed to fetch product:", err);
        setError("Could not load product details");
      } finally {
        setProductLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setImageFile(file);
      setImage(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!productId) {
      setError("Product ID is missing");
      return;
    }
    
    if (!orderId) {
      setError("Order ID is missing");
      return;
    }
    
    if (!userId) {
      setError("Please log in to submit a review");
      return;
    }
    
    if (rating === 0) {
      setError("Please select a rating");
      return;
    }
    
    if (!review.description.trim()) {
      setError("Please write a review");
      return;
    }

    setLoading(true);
    setError("");
    
    // Create FormData to properly handle image upload
    const formData = new FormData();
    formData.append("userId", userId);
    formData.append("productId", productId);
    formData.append("orderId", orderId); // Add orderId to the form data
    formData.append("rating", rating);
    formData.append("review", review.description);
    
    if (imageFile) {
      formData.append("images", imageFile);
    }

    try {
      console.log("Submitting review with data:");
      for (let pair of formData.entries()) {
        console.log(pair[0] + ': ' + pair[1]);
      }
      
      const response = await addReviews(formData);
      console.log("Review submitted successfully:", response);
      setSuccess("Review submitted successfully!");
      // Reset form
      setRating(0);
      setReview({ title: "", description: "" });
      setImage(null);
      setImageFile(null);
    } catch (error) {
      console.error("Failed to submit review:", error);
      const errorMessage = error.response?.data?.message || 
                          error.message || 
                          "Failed to submit review. Please try again.";
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography variant="h6" fontWeight="bold" mb={2}>
        Rate & Review Product
      </Typography>

      {productLoading ? (
        <Box sx={{ display: "flex", justifyContent: "center", my: 3 }}>
          <CircularProgress />
        </Box>
      ) : product ? (
        <Box sx={{ display: "flex", alignItems: "center", mb: 2 }}>
          <CardMedia
            component="img"
            image={`https://rigsdock.com/uploads/${product.images?.[0]}`}
            alt={product.name}
            sx={{ width: 80, height: 80, objectFit: "contain", borderRadius: 2, mr: 2 }}
          />
          <Box>
            <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
            <Typography variant="body2" color="textSecondary">₹{product.price}</Typography>
            {/* <Typography variant="body2" color="primary">Product ID: {productId}</Typography>
            <Typography variant="body2" color="primary">Order ID: {orderId}</Typography> */}
          </Box>
        </Box>
      ) : (
        <Alert severity="warning" sx={{ mb: 2 }}>
          Product details not available
        </Alert>
      )}

      {error && (
        <Alert severity="error" sx={{ mb: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {success && (
        <Alert severity="success" sx={{ mb: 2 }} onClose={() => setSuccess("")}>
          {success}
        </Alert>
      )}

      <Typography variant="h6" fontWeight="bold" gutterBottom mt={2}>
        Rate this product
      </Typography>
      <Box sx={{ display: "flex", alignItems: "center", gap: 1, mb: 2 }}>
        {[1, 2, 3, 4, 5].map((star) => (
          <IconButton key={star} onClick={() => setRating(star)}>
            {rating >= star ? <Star color="warning" /> : <StarBorder color="warning" />}
          </IconButton>
        ))}
        <Typography color="success.main">
          {rating === 5 ? "Excellent" : 
           rating === 4 ? "Very Good" : 
           rating === 3 ? "Good" : 
           rating === 2 ? "Fair" : 
           rating === 1 ? "Poor" : ""}
        </Typography>
      </Box>

      <Typography variant="h6" fontWeight="bold" gutterBottom>
        Review this product
      </Typography>
      <TextField
        label="Description"
        multiline
        rows={4}
        fullWidth
        value={review.description}
        onChange={(e) => setReview({ ...review, description: e.target.value })}
        sx={{ mb: 2 }}
      />
      
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
        {image && (
          <Box sx={{ position: "relative", width: 80, height: 80 }}>
            <img src={image} alt="Review" style={{ width: "100%", height: "100%", objectFit: "cover", borderRadius: 4 }} />
            <IconButton
              size="small"
              onClick={() => {
                setImage(null);
                setImageFile(null);
              }}
              sx={{ position: "absolute", top: -8, right: -8, bgcolor: "error.main", color: "white" }}
            >
              <Close fontSize="small" />
            </IconButton>
          </Box>
        )}
        <Button variant="outlined" component="label" startIcon={<PhotoCamera />}>
          Add Photo
          <input type="file" hidden accept="image/*" onChange={handleImageUpload} />
        </Button>
      </Box>
      
      <Button 
        variant="contained" 
        color="warning" 
        fullWidth 
        onClick={handleSubmit}
        disabled={loading || !productId || !userId}
      >
        {loading ? "Submitting..." : "Submit"}
      </Button>
    </Paper>
  );
};

export default ProductReview;