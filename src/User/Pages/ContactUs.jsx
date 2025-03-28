import React from "react";
import { Container, Grid, Typography, TextField, Button, Card, CardContent, IconButton } from "@mui/material";
import { Email, Phone, LocationOn } from "@mui/icons-material";
import Header from "../Components/Header";

const ContactUs = () => {
  return (
   <div>
    <Header></Header>
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Contact Us
          </Typography>
          
          {/* Contact Details */}
          <Grid container spacing={4}>
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <IconButton color="primary">
                  <Email />
                </IconButton>
                <Typography variant="h6">Email</Typography>
                <Typography variant="body1">
                  <a href="mailto:support@rigsdock.com" style={{ textDecoration: "none", color: "inherit" }}>
                    support@rigsdock.com
                  </a>
                </Typography>
              </Card>
            </Grid>
    
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <IconButton color="primary">
                  <Phone />
                </IconButton>
                <Typography variant="h6">Phone</Typography>
                <Typography variant="body1">
                  <a href="tel:+919778466748" style={{ textDecoration: "none", color: "inherit" }}>
                    +91 97784 66748
                  </a>
                </Typography>
              </Card>
            </Grid>
    
            <Grid item xs={12} md={4}>
              <Card sx={{ p: 2, textAlign: "center" }}>
                <IconButton color="primary">
                  <LocationOn />
                </IconButton>
                <Typography variant="h6">Address</Typography>
                <Typography variant="body2">
                  LR Towers, SJRRA 104, S Janatha Road, Palarivattom, Kochi, Kerala 682025
                </Typography>
              </Card>
            </Grid>
          </Grid>
    
          {/* Contact Form */}
          <Card sx={{ mt: 4 }}>
            <CardContent>
              <Typography variant="h5" fontWeight="bold" gutterBottom>
                Get in Touch
              </Typography>
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Your Name" fullWidth required />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextField label="Email Address" type="email" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Subject" fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField label="Message" multiline rows={4} fullWidth required />
                  </Grid>
                  <Grid item xs={12}>
                    <Button variant="contained" color="primary" fullWidth>
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </form>
            </CardContent>
          </Card>
        </Container>
   </div>
  );
};

export default ContactUs;
