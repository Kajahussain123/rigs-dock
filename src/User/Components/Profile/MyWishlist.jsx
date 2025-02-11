import React from "react";
import { Box, Typography, Button, IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";

const wishlistItems = [
  {
    id: 1,
    name: "JBL Tune 770NC Active Noise Cancelling, 70Hr Playtime, Fast Pair & Multi Connect Bluetooth Gaming",
    price: "₹4,999",
    originalPrice: "₹9,999",
    discount: "50% off",
    image: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    id: 2,
    name: "JBL Tune 770NC Active Noise Cancelling, 70Hr Playtime, Fast Pair & Multi Connect Bluetooth Gaming",
    price: "₹4,999",
    originalPrice: "₹9,999",
    discount: "50% off",
    image: "https://via.placeholder.com/100", // Replace with actual image URL
  },
  {
    id: 3,
    name: "JBL Tune 770NC Active Noise Cancelling, 70Hr Playtime, Fast Pair & Multi Connect Bluetooth Gaming",
    price: "₹4,999",
    originalPrice: "₹9,999",
    discount: "50% off",
    image: "https://via.placeholder.com/100", // Replace with actual image URL
  },
];

const WishlistPage = () => {
  return (
    <Box display="flex" p={2}>
      

      {/* Wishlist Content */}
      <Box width="75%" p={3} sx={{ background: "#f5f5f5", borderRadius: 2 }}>
        <Typography variant="h5" fontWeight="bold" mb={2}>
          Wishlist
        </Typography>

        {wishlistItems.map((item) => (
          <Box
            key={item.id}
            display="flex"
            alignItems="center"
            p={2}
            bgcolor="white"
            borderRadius={2}
            mb={2}
          >
            <img src={item.image} alt={item.name} width={80} height={80} style={{ borderRadius: 8 }} />

            <Box flex={1} ml={2}>
              <Typography fontWeight="bold">{item.name}</Typography>
              <Typography fontSize={16}>
                <strong>{item.price}</strong>{" "}
                <span style={{ textDecoration: "line-through", color: "gray", marginLeft: 5 }}>
                  {item.originalPrice}
                </span>{" "}
                <span style={{ color: "blue", marginLeft: 5 }}>{item.discount}</span>
              </Typography>
            </Box>

            <Button variant="contained" sx={{ backgroundColor: "#0073e6", color: "white", mr: 2 }}>
              BUY NOW
            </Button>

            <IconButton color="error">
              <DeleteIcon />
            </IconButton>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default WishlistPage;
