import React, { useState } from "react";
import { Avatar, Box, Button, Container, Grid, Paper, TextField, Typography, Radio, RadioGroup, FormControlLabel } from "@mui/material";

const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false);
  const [user, setUser] = useState({
    firstName: "Hari",
    lastName: "Prasad",
    email: "hari592@gmail.com",
    mobile: "889774544",
    gender: "male",
  });

  const handleEdit = () => {
    setIsEditing(!isEditing);
  };

  return (
    <Container maxWidth="lg">
      <Grid container spacing={3}>
        
        {/* Profile Information */}
        <Grid item xs={12} sm={8}>
          <Paper elevation={2} sx={{ padding: 3 }}>
            <Box display="flex" justifyContent="space-between" alignItems="center">
              <Typography variant="h6">Personal Information</Typography>
              <Button onClick={handleEdit} color="primary">
                {isEditing ? "Save" : "Edit"}
              </Button>
            </Box>

            <Grid container spacing={2} sx={{ mt: 2 }}>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="First Name"
                  value={user.firstName}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={6}>
                <TextField
                  fullWidth
                  label="Last Name"
                  value={user.lastName}
                  disabled={!isEditing}
                  variant="outlined"
                />
              </Grid>
            </Grid>

            <RadioGroup row value={user.gender} sx={{ mt: 2 }}>
              <FormControlLabel value="male" control={<Radio disabled={!isEditing} />} label="Male" />
              <FormControlLabel value="female" control={<Radio disabled={!isEditing} />} label="Female" />
            </RadioGroup>

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="body1">Email address</Typography>
              <Button color="primary">Edit</Button>
            </Box>
            <TextField fullWidth value={user.email} disabled variant="outlined" sx={{ mt: 1 }} />

            <Box display="flex" justifyContent="space-between" alignItems="center" sx={{ mt: 2 }}>
              <Typography variant="body1">Mobile number</Typography>
              <Button color="primary">Edit</Button>
            </Box>
            <TextField fullWidth value={user.mobile} disabled variant="outlined" sx={{ mt: 1 }} />
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ProfilePage;
