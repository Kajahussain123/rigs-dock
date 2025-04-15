import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import { Grid, Button } from "@mui/material";
import ProfilePage from "../Components/Profile/MyProfile";
import Header from "../Components/Header";
import ProfileSidebar from "../Components/Profile/SideBar";
import WishlistPage from "../Components/Profile/MyWishlist";
import ManageAddresses from "../Components/Profile/Address";
import MyReviews from "../Components/Profile/Review&Ratings";
import MyOrders from "../Components/Profile/MyOrders";
import ProductReview from "../Components/Profile/AddReviews";
import OrderDetails from "../Components/Profile/OrderDetails";
import ReturnProduct from "../Components/Profile/Return";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import TrackingPage from "../Components/Profile/TrackInfo";

const Profile = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const location = useLocation();

  const [showSidebar, setShowSidebar] = useState(true);

  useEffect(() => {
    if (isMobile) {
      // Show only sidebar on "/profile"
      setShowSidebar(location.pathname === "/profile");
    } else {
      // Show both sidebar and dashboard on larger screens when entering "/profile"
      setShowSidebar(true);
    }
  }, [location.pathname, isMobile]);

  return (
    <div style={{ backgroundColor: "#F1F6FC" }}>
      <Header />
      <Grid container spacing={2} sx={{ mt: 1, pl: 2 }}>
        {/* Sidebar - Always visible on large screens, conditionally visible on mobile */}
        {!isMobile || showSidebar ? (
          <Grid item xs={12} sm={3}>
            <ProfileSidebar onOptionClick={() => isMobile && setShowSidebar(false)} />
          </Grid>
        ) : null}

        {/* Main Content */}
        {!showSidebar || !isMobile ? (
          <Grid item xs={12} sm={9} sx={{ pl: 2, pr: 2 }}>
            {/* Back Button - Only on mobile when sidebar is hidden */}
            {isMobile && !showSidebar && (
              <Button variant="outlined" sx={{ mb: 2 }} onClick={() => setShowSidebar(true)}>
                Back
              </Button>
            )}

            <Routes>
              <Route path="/" element={<Navigate to="dashboard" />} />
              <Route path="dashboard" element={<ProfilePage />} />
              <Route path="wishlist" element={<WishlistPage />} />
              <Route path="address" element={<ManageAddresses />} />
              <Route path="reviews" element={<MyReviews />} />
              <Route path="return/:orderId/:productId" element={<ReturnProduct />} />
              <Route path="orders" element={<MyOrders />} />
              <Route path="track" element={<TrackingPage />} />
              <Route path="addReview/:productId" element={<ProductReview />} />
              <Route path="order-details/:orderId" element={<OrderDetails />} />
            </Routes>
          </Grid>
        ) : null}
      </Grid>
    </div>
  );
};

export default Profile;
