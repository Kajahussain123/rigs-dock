import React, { useEffect, useState } from "react";
import {
  Box,
  Container,
  Typography,
  IconButton,
  Paper,
  Grid,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogActions,
  Button
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { getWishlist, removeWishlist } from "../../../Services/allApi";
import { useNavigate } from "react-router-dom";

const BASE_URL = "http://localhost:3006/uploads/";

const MyWishlist = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const products = await getWishlist(userId);
        setWishlist(products);
      } catch (error) {
        console.error("Error fetching wishlist:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) fetchWishlist();
  }, [userId]);

  const handleRemoveClick = (product, e) => {
    e.stopPropagation(); // Prevent navigation when clicking the delete button
    setSelectedProduct(product);
    setOpenDialog(true);
  };

  const confirmRemove = async () => {
    if (!selectedProduct) return;

    try {
      await removeWishlist(userId, selectedProduct._id);
      setWishlist(wishlist.filter((item) => item._id !== selectedProduct._id));
    } catch (error) {
      console.error("Error removing item:", error);
    } finally {
      setOpenDialog(false);
      setSelectedProduct(null);
    }
  };

  return (
    <Box>
      <Paper elevation={2} sx={{ p: 3 }}>
        <Typography variant="h6" fontWeight="bold" mb={2} sx={{ fontFamily: `"Montserrat", sans-serif`, }}>
          My Wishlist ({wishlist.length})
        </Typography>

        {loading ? (
          <Box display="flex" justifyContent="center" py={3}>
            <CircularProgress />
          </Box>
        ) : wishlist.length === 0 ? (
          <Box sx={{ textAlign: "center", mt: 5 }}>
            <CardMedia
              component="img"
              sx={{ width: 200, margin: "auto" }}
              image="https://cdn-icons-png.flaticon.com/512/4076/4076432.png" // Wishlist empty illustration
              alt="Empty Wishlist"
            />
            <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, mt: 2 }}>
              Your wishlist is empty.
            </Typography>
            <Typography variant="body2" sx={{ fontFamily: `"Montserrat", sans-serif`, color: "text.secondary", mb: 2 }}>
              Save your favorite items for later.
            </Typography>
            <Button
              variant="contained"
              sx={{ fontFamily: `"Montserrat", sans-serif`, textTransform: "none", bgcolor: "#0A5FBF" }}
              onClick={() => navigate("/")}
            >
              Start Shopping
            </Button>
          </Box>
        ) : (
          wishlist.map((item) => (
            <Box
              key={item._id}
              sx={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                py: 2,
                borderBottom: "1px solid #e0e0e0",
                cursor: "pointer", // Make entire row clickable
                "&:hover": { backgroundColor: "#f5f5f5" }, // Light hover effect
              }}
              onClick={() => navigate(`/single/${item._id}`)} // Navigate to product page
            >
              <Grid container alignItems="center" spacing={2}>
                {/* Product Image */}
                <Grid item xs={3} sm={2}>
                  <CardMedia
                    component="img"
                    image={`${BASE_URL}${item.images[0]}`}
                    alt={item.name}
                    sx={{
                      width: "100%",
                      height: "auto",
                      maxHeight: "80px",
                      objectFit: "contain",
                    }}
                  />
                </Grid>

                {/* Product Details */}
                <Grid item xs={7} sm={8}>
                  <Typography variant="body1" fontWeight="medium" sx={{
                    display: "-webkit-box",
                    WebkitLineClamp: 2,
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    fontFamily: `"Montserrat", sans-serif`,
                  }}>
                    {item.name}
                  </Typography>

                  {/* Price and Discount */}
                  <Typography variant="h6" fontWeight="bold" sx={{ mt: 1 }}>
                  ₹{item.finalPrice}
                    {item.oldPrice && (
                      <>
                        <Typography
                          component="span"
                          variant="body2"
                          color="text.secondary"
                          sx={{ fontFamily: `"Montserrat", sans-serif`, ml: 1, textDecoration: "line-through" }}
                        >
                          {item.oldPrice}
                        </Typography>
                        <Typography
                          component="span"
                          variant="body2"
                          color="green"
                          sx={{ fontFamily: `"Montserrat", sans-serif`, ml: 1 }}
                        >
                          {item.discount}
                        </Typography>
                      </>
                    )}
                  </Typography>
                </Grid>

                {/* Delete Icon */}
                <Grid item xs={2} sm={2} textAlign="right">
                  <IconButton color="error" onClick={(e) => handleRemoveClick(item, e)}>
                    <DeleteIcon />
                  </IconButton>
                </Grid>
              </Grid>
            </Box>
          ))
        )}
      </Paper>

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: `"Montserrat", sans-serif`, }}>Are you sure you want to remove this item from your wishlist?</DialogTitle>
        <DialogActions>
          <Button sx={{ fontFamily: `"Montserrat", sans-serif`, }} onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button sx={{ fontFamily: `"Montserrat", sans-serif`, }} onClick={confirmRemove} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default MyWishlist;
