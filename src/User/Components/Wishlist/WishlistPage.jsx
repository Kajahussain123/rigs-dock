import React, { useEffect, useState } from "react";
import { Container, Grid, Card, CardMedia, CardContent, Typography, Button, IconButton, CircularProgress, Dialog, DialogTitle, DialogActions, Box } from "@mui/material";
import { Delete } from "@mui/icons-material";
import { getWishlist, removeWishlist } from "../../../Services/allApi";
import { useNavigate } from "react-router-dom";

const WishlistPage = () => {
  const [wishlist, setWishlist] = useState([]);
  const [loading, setLoading] = useState(true);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const navigate = useNavigate();

  const userId = localStorage.getItem("userId");
  const BASE_URL = "https://rigsdock.com/uploads/";

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

  const handleRemoveClick = (product) => {
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
    <Container sx={{ mt: 4 }}>
      <Typography variant="h4" sx={{ fontFamily: `"Montserrat", sans-serif`, textAlign: "center", fontWeight: "bold", mb: 3 }}>
        Wishlist
      </Typography>

      {loading ? (
        <CircularProgress />
      ) : wishlist.length === 0 ? (
        <Box sx={{ textAlign: "center", mt: 5 }}>
          <CardMedia
            component="img"
            sx={{ width: 200, margin: "auto" }}
            image="https://cdn-icons-png.flaticon.com/512/4076/4076432.png"
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
        <Grid container spacing={3} justifyContent="center">
          {wishlist.map((item) => (
            <Grid item xs={12} sm={5.5} key={item._id}>
              {/* Wrap card in Box to handle redirection */}
              <Box onClick={() => navigate(`/single/${item._id}`)} sx={{ cursor: "pointer" }}>
                <Card sx={{ display: "flex", alignItems: "center", p: 2, borderRadius: 2, boxShadow: 3 }}>
                  <CardMedia
                    component="img"
                    sx={{ width: 120, height: 120, borderRadius: 2, mr: 2 }}
                    image={`${BASE_URL}${item.images[0]}`}
                    alt={item.name}
                  />
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold" }}>
                      {item.name}
                    </Typography>
                    <Typography color="text.secondary" sx={{ fontFamily: `"Montserrat", sans-serif`, fontWeight: "bold", fontSize: "18px" }}>
                    ₹ {item.finalPrice}
                    </Typography>
                  </CardContent>
                  <IconButton color="error" onClick={(e) => { e.stopPropagation(); handleRemoveClick(item); }}>
                    <Delete />
                  </IconButton>
                </Card>
              </Box>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle sx={{ fontFamily: `"Montserrat", sans-serif` }}>Are you sure you want to remove this item from your wishlist?</DialogTitle>
        <DialogActions>
          <Button sx={{ fontFamily: `"Montserrat", sans-serif` }} onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button sx={{ fontFamily: `"Montserrat", sans-serif` }} onClick={confirmRemove} color="error">
            Remove
          </Button>
        </DialogActions>
      </Dialog>
    </Container>
  );
};

export default WishlistPage;
