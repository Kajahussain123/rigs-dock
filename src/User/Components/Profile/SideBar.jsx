import React, { useState } from 'react';
import { List, ListItem, ListItemText, ListItemIcon, Paper } from '@mui/material';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';

const menuItems = [
    { label: "Dashboard", key: "dashboard", icon: <DashboardIcon /> },
    { label: "Orders", key: "wishlist", icon: <ShoppingCartIcon /> },
    { label: "Addresses", key: "addresses", icon: <LocationOnIcon /> },
    { label: "Account Details", key: "accountDetails", icon: <AccountCircleIcon /> },
    { label: "Log Out", key: "logout", icon: <LogoutIcon /> }
];

const ProfileSidebar = ({ onSelect }) => {
    const [activeSection, setActiveSection] = useState('dashboard');

    const handleSelect = (section) => {
        setActiveSection(section);
        onSelect(section);
    };

    return (
        <Paper elevation={2} sx={{ p: 2, borderRadius: 2 }}>
            <List component="nav">
                {menuItems.map((item) => (
                    <ListItem 
                        button 
                        key={item.key} 
                        onClick={() => handleSelect(item.key)}
                        sx={{ 
                            backgroundColor: activeSection === item.key ? "#0073e6" : "transparent",
                            color: activeSection === item.key ? "white" : "black",
                            borderRadius: 1,
                            mb: 1
                        }}
                    >
                        <ListItemIcon sx={{ color: activeSection === item.key ? "white" : "black" }}>
                            {item.icon}
                        </ListItemIcon>
                        <ListItemText primary={item.label} />
                    </ListItem>
                ))}
            </List>
        </Paper>
    );
};

export default ProfileSidebar;
