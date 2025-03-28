import React, { useEffect, useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Paper, Box, Typography, Avatar } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom'; // ✅ Import React Router hooks
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import StarBorderIcon from '@mui/icons-material/StarBorder';
import LogoutIcon from '@mui/icons-material/Logout';
import { getProfile } from '../../../Services/allApi';

const menuItems = [
    { label: "Personal information", key: "dashboard", icon: <AccountCircleIcon /> },
    { label: "Manage address", key: "address", icon: <LocationOnIcon /> },
    { label: "My orders", key: "orders", icon: <ShoppingCartIcon /> },
    { label: "My Wishlist", key: "wishlist", icon: <FavoriteBorderIcon /> },
    { label: "My reviews and rating", key: "reviews", icon: <StarBorderIcon /> },
];

const ProfileSidebar = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [profile, setProfile] = useState({ username: "", email: "" });

    const userId = localStorage.getItem("userId");

     useEffect(() => {
        const fetchProfile = async () => {
          try {
            const data = await getProfile(userId);
            setProfile({ 
              name: data.name, 
              email: data.email,
              mobileNumber: data.mobileNumber
            });
          } catch (error) {
            console.error("Failed to fetch profile", error);
          }
        };
        
        if (userId) {
          fetchProfile();
        }
      }, [userId]);

    const handleSelect = (section) => {
        navigate(`/profile/${section}`); // ✅ Navigate instead of setting state
    };

    return (
        <Paper elevation={0} sx={{ p: 2, borderRadius: 2, backgroundColor: "#FFFFFF" }}>
            <Box display="flex" alignItems="center" py={2} px={2}>
                <Avatar sx={{ width: 50, height: 50, mr: 2 }} />
                <Box>
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="body2" fontWeight="bold">Hello</Typography>
                    <Typography sx={{ fontFamily: `"Montserrat", sans-serif`, }} variant="h6">{profile.name}</Typography>
                </Box>
            </Box>
            <List component="nav">
                {menuItems.map((item) => (
                    <ListItem
                        button
                        key={item.key}
                        onClick={() => handleSelect(item.key)}
                        sx={{
                            backgroundColor: location.pathname.includes(item.key) ? "#e3f2fd" : "transparent", // ✅ Active section based on URL
                            color: "black",
                            borderRadius: 1,
                            fontFamily: `"Montserrat", sans-serif`,
                            mb: 1,
                            '&:hover': { backgroundColor: "#e3f2fd" }
                        }}
                    >
                        <ListItemIcon sx={{ fontFamily: `"Montserrat", sans-serif`, minWidth: 36, color: "black" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primaryTypographyProps={{ sx: { fontFamily: `"Montserrat", sans-serif` } }} primary={item.label} />
                    </ListItem>
                ))}
            </List>
            <ListItem
                button
                onClick={() => {
                    localStorage.removeItem("userId"); // Example logout action
                    navigate("/"); // Redirect to login page
                }}
                sx={{ fontFamily: `"Montserrat", sans-serif`, mt: 2, borderTop: "1px solid #ddd" }}
            >
                <ListItemIcon sx={{ minWidth: 36, color: "black" }}>
                    <LogoutIcon />
                </ListItemIcon>
                <ListItemText sx={{ fontFamily: `"Montserrat", sans-serif`, }} primary="Logout" />
            </ListItem>
        </Paper>
    );
};

export default ProfileSidebar;
