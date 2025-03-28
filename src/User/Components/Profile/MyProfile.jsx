import React, { useState, useEffect } from "react";
import { Box, TextField, Typography, Link, Paper } from "@mui/material";
import { getProfile } from "../../../Services/allApi";

const ProfileInfo = () => {
  const [profile, setProfile] = useState({ name: "", email: "", mobileNumber: "" });

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

  return (
    <Paper elevation={0} sx={{ p: 3, pr: 4, backgroundColor: "#FFFFFF" }}>
      {/* Personal Information */}
      <Box mb={2} display="flex" alignItems="center">
        <Typography variant="h6" fontWeight="bold" mr={1} sx={{fontFamily: `"Montserrat", sans-serif`,}}>
          Personal Information
        </Typography>
        {/* <Link href="#" sx={{ fontSize: 14, color: "#0073e6", cursor: "pointer" }}>
          Edit
        </Link> */}
      </Box>
      <Box display="flex" gap={2} mb={2}>
        <TextField
        
          label="Full Name"
          value={profile.name}
          disabled
          size="small"
          sx={{ width: "300px", mb: 2 }}
        />
      </Box>

      {/* Email Address */}
      <Box mb={2} display="flex" alignItems="center">
        <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" mr={1}>
          Email Address
        </Typography>
        {/* <Link href="#" sx={{ fontSize: 14, color: "#0073e6", cursor: "pointer" }}>
          Edit
        </Link> */}
      </Box>
      <TextField
        label="Email"
        value={profile.email}
        disabled
        size="small"
        sx={{ width: "300px", mb: 2 }}
      />

      {/* Mobile Number */}
      <Box mb={2} display="flex" alignItems="center">
        <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" mr={1}>
          Mobile Number
        </Typography>
      </Box>
      <TextField
        label="Mobile Number"
        value={profile.mobileNumber}
        disabled
        size="small"
        sx={{ width: "300px", mb: 2 }}
      />
    </Paper>
  );
};

export default ProfileInfo;
