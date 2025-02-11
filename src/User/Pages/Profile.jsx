import React, { useState } from 'react';
import { Grid } from '@mui/material';
import ProfilePage from '../Components/Profile/MyProfile';
import Header from '../Components/Header';
import ProfileSidebar from '../Components/Profile/SideBar';
import WishlistPage from '../Components/Profile/MyWishlist';

const Profile = () => {
    const [selectedSection, setSelectedSection] = useState('dashboard');

    const renderSection = () => {
        switch (selectedSection) {
            case 'dashboard': // Add this case for dashboard
                return <ProfilePage />;
            case 'wishlist':
                return <WishlistPage/>

            default:
                return <ProfilePage />;
        }
    };

    return (
        <div>
            <Header></Header>
            <Grid container spacing={2} sx={{mt:1}}>
                
                <Grid item xs={12} sm={3}>
                    <ProfileSidebar onSelect={setSelectedSection} />
                </Grid>
                <Grid item xs={12} sm={9}>
                    {renderSection()}
                </Grid>
            </Grid>
        </div>
    );
};

export default Profile;
