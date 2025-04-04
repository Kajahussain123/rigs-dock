import React, { useEffect, useState } from "react";
import {
  Container,
  Paper,
  Typography,
  Button,
  Box,
  TextField,
  Grid,
  MenuItem,
  IconButton,
  Snackbar,
  Alert,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Add, Delete } from "@mui/icons-material";
import { addAddress, userAddressView, deleteAddress } from "../../../Services/allApi";

const ManageAddresses = () => {
  const [addresses, setAddresses] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [newAddress, setNewAddress] = useState({
    firstName: "",
    lastName:"",
    phone: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    country: "",
    zipCode: "",
    addressType: "Home",
  });
  const [successMessage, setSuccessMessage] = useState("");
  const [deleteDialog, setDeleteDialog] = useState({ open: false, addressId: null });

  const userId = localStorage.getItem("userId"); // Get userId from localStorage

  useEffect(() => {
    const fetchAddresses = async () => {
      try {
        if (!userId) return;
        const data = await userAddressView(userId);
        setAddresses(data);
      } catch (error) {
        console.error("Error fetching addresses:", error);
      }
    };
    fetchAddresses();
  }, [userId]);

  const handleChange = (e) => {
    setNewAddress({ ...newAddress, [e.target.name]: e.target.value });
  };

  const handleSubmit = async () => {
    try {
      const reqBody = { userId, ...newAddress };
      await addAddress(reqBody);
  
      // ✅ Fetch updated addresses from the backend
      const updatedAddresses = await userAddressView(userId);
      setAddresses(updatedAddresses); // Update state with fresh data
  
      setShowForm(false); // Hide form after submission
      setSuccessMessage("Address added successfully!");
      
      // Reset form fields
      setNewAddress({
        firstName:"",lastName: "", phone: "", addressLine1: "", addressLine2: "", 
        city: "", state: "", country: "", zipCode: "", addressType: "Home"
      });
  
    } catch (error) {
      console.error("Error adding address:", error);
    }
  };
  

  const handleDelete = async () => {
    try {
      await deleteAddress(deleteDialog.addressId);
      setAddresses(addresses.filter((address) => address._id !== deleteDialog.addressId));
      setSuccessMessage("Address deleted successfully!");
    } catch (error) {
      console.error("Error deleting address:", error);
    }
    setDeleteDialog({ open: false, addressId: null });
  };

  return (
    <Paper elevation={2} sx={{ p: 3 }}>
      <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="h6" fontWeight="bold" mb={2}>
        Manage Addresses
      </Typography>
      <Button
        startIcon={<Add />}
        variant="outlined"
        fullWidth
        sx={{fontFamily: `"Montserrat", sans-serif`, mb: 2, textTransform: "none" }}
        onClick={() => setShowForm(!showForm)}
      >
        {showForm ? "Cancel" : "Add a New Address"}
      </Button>

      {showForm && (
        <Paper elevation={1} sx={{ p: 3, mb: 2 }}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <TextField  label="Firts Name" name="firstName" value={newAddress.firstName} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Last Name" name="lastName" value={newAddress.lastName} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={4}>
              <TextField label="Phone Number" name="phone" value={newAddress.phone} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address Line 1" name="addressLine1" value={newAddress.addressLine1} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField label="Address Line 2" name="addressLine2" value={newAddress.addressLine2} onChange={handleChange} fullWidth />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="City" name="city" value={newAddress.city} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="State" name="state" value={newAddress.state} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="ZIP Code" name="zipCode" value={newAddress.zipCode} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12} sm={3}>
              <TextField label="Country" name="country" value={newAddress.country} onChange={handleChange} fullWidth required />
            </Grid>
            <Grid item xs={12}>
              <TextField select label="Address Type" name="addressType" value={newAddress.addressType} onChange={handleChange} fullWidth>
                <MenuItem value="Home">Home</MenuItem>
                <MenuItem value="Office">Office</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12}>
              <Button sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="contained" color="primary" fullWidth onClick={handleSubmit}>
                Save Address
              </Button>
            </Grid>
          </Grid>
        </Paper>
      )}

      {addresses.map((address, index) => (
        <Paper key={index} elevation={1} sx={{ p: 2, mb: 2, display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <Box>
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body1" fontWeight="bold" mt={1}>
              {address.firstName} {address.lastName} &nbsp; {address.phone}
            </Typography>
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2">
              {address.addressLine1}, {address.addressLine2}
            </Typography>
            <Typography sx={{fontFamily: `"Montserrat", sans-serif`,}} variant="body2">
              {address.city}, {address.state}, {address.zipCode}, {address.country}
            </Typography>
          </Box>
          <IconButton onClick={() => setDeleteDialog({ open: true, addressId: address._id })}>
            <Delete />
          </IconButton>
        </Paper>
      ))}

      <Dialog open={deleteDialog.open} onClose={() => setDeleteDialog({ open: false, addressId: null })}>
        <DialogTitle sx={{fontFamily: `"Montserrat", sans-serif`,}}>Confirm Deletion</DialogTitle>
        <DialogContent sx={{fontFamily: `"Montserrat", sans-serif`,}}><DialogContentText>Are you sure you want to delete this address?</DialogContentText></DialogContent>
        <DialogActions>
          <Button sx={{fontFamily: `"Montserrat", sans-serif`,}} onClick={() => setDeleteDialog({ open: false, addressId: null })}>Cancel</Button>
          <Button sx={{fontFamily: `"Montserrat", sans-serif`,}} color="error" onClick={handleDelete}>Delete</Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default ManageAddresses;
