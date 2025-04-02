import React, { useEffect } from "react";
import { Box, Container, Grid, Typography, Link, IconButton } from "@mui/material";
import { Facebook, Twitter, Google, Instagram, LinkedIn, GitHub, Home, Email, Phone, Print } from "@mui/icons-material";

const Footer = () => {

useEffect(() => {
  document.body.style.paddingBottom = "0"; // Reset padding
}, []);

  return (
    <Box sx={{ backgroundColor: "#01012c", color: "white", mt: 5  }}>
      {/* <Box sx={{ backgroundColor: "#673AB7", p: 2, textAlign: "center" }}>
        <Typography style={{fontFamily: `"Montserrat", sans-serif`,}}>Get connected with us on social networks:</Typography>
        <Box sx={{ mt: 1 }}>
          <IconButton sx={{ color: "white" }}><Facebook /></IconButton>
          <IconButton sx={{ color: "white" }}><Twitter /></IconButton>
          <IconButton sx={{ color: "white" }}><Google /></IconButton>
          <IconButton sx={{ color: "white" }}><Instagram /></IconButton>
          <IconButton sx={{ color: "white" }}><LinkedIn /></IconButton>
          <IconButton sx={{ color: "white" }}><GitHub /></IconButton>
        </Box>
      </Box> */}

      <Container sx={{ py: 5 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{fontFamily: `"Montserrat", sans-serif`, mb: 2, borderBottom: "2px solid #0A5FBF", display: "inline-block" }}>
              RIGSDOCK
            </Typography>
            <Typography style={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2">
            Your One-Stop Online Shopping Destination
            </Typography>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{fontFamily: `"Montserrat", sans-serif`, mb: 2, borderBottom: "2px solid #0A5FBF", display: "inline-block" }}>
              PRODUCTS
            </Typography>
            <Box>
              <Link href="#" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>PC Peripherals</Link>
              <Link href="#" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>PC Components</Link>
              
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{fontFamily: `"Montserrat", sans-serif`, mb: 2, borderBottom: "2px solid #0A5FBF", display: "inline-block" }}>
              USEFUL LINKS
            </Typography>
            <Box>
              <Link href="/profile" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Your Account</Link>
              <Link href="/seller" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Become an Seller</Link>
              <Link href="/terms" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Terms & Conditions</Link>
              <Link href="/privacy" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Privacy & Policy</Link>
              <Link href="/cancellation" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Cancellation & Refund</Link>
              <Link href="/shipping" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Shipping Policy</Link>
              <Link href="/contactus" color="inherit" display="block" style={{fontFamily: `"Montserrat", sans-serif`,}}>Contact US</Link>
            </Box>
          </Grid>

          <Grid item xs={12} sm={6} md={3}>
            <Typography variant="h6" sx={{fontFamily: `"Montserrat", sans-serif`, mb: 2, borderBottom: "2px solid #0A5FBF", display: "inline-block" }}>
              CONTACT
            </Typography>
            <Box>
              <Typography variant="body2"><Home sx={{ mr: 1 }} style={{fontFamily: `"Montserrat", sans-serif`,}} /> LR Towers, SJRRA 104, S Janatha Road, Palarivattom, Kochi, Kerala 682025</Typography>
              <Typography variant="body2"><Email sx={{ mr: 1 }} style={{fontFamily: `"Montserrat", sans-serif`,}} />support@rigsdock.com</Typography>
              <Typography variant="body2"><Phone sx={{ mr: 1 }} style={{fontFamily: `"Montserrat", sans-serif`,}} />+91 97784 66748</Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      <Box sx={{ textAlign: "center", py: 2, backgroundColor: "#181825" }}>
        <Typography style={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2">&copy; 2025 Copyright: Rigsdock.com</Typography>
      </Box>
    </Box>
  );
};

export default Footer;
