import React, { useState } from 'react';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {Box,TextField,Button,Typography,Paper,Grid,FormControlLabel,Checkbox,Container,Snackbar,Alert,IconButton,} from '@mui/material';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseIcon from '@mui/icons-material/Close';
import { vendorRegister, verifyBank } from '../../../Services/allApi';

const UploadBox = ({ title, onFileChange }) => (
  <Box
    sx={{
      border: '2px dashed #ccc',
      borderRadius: 1,
      p: 2,
      width: '100%',
      maxWidth: 200,
      height: 100,
      textAlign: 'center',
      cursor: 'pointer',
      '&:hover': {
        backgroundColor: '#F5F5F5'
      }
    }}
  >
    <input
      type="file"
      style={{ display: 'none' }}
      id={`file-upload-${title}`}
      onChange={onFileChange}
      multiple={title === 'Shop Image'} // Allow multiple files only for shop images
    />
    <label htmlFor={`file-upload-${title}`}>
      <CloudUploadIcon sx={{ fontSize: 30, color: '#888' }} />
      <Typography variant="body2" color="textSecondary" mt={1}>
        Upload {title}
      </Typography>
    </label>
  </Box>
);

const BecomeSeller = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState({
    ownername: '',
    email: '',
    businessname: '',
    businesslocation: '',
    businesslandmark: '',
    number: '',
    address: '',
    city: '',
    state: '',
    pincode: '',
    description: '',
    storetype: '',
    password: '',
    storelogo: null,
    license: null,
    images: [],
    bankAccountNumber:'',
    ifscCode:'',
  });
  const [preview, setPreview] = useState({
    storelogo: null,
    license: null,
    images: []
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [bankVerified, setBankVerified] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      setFormData({ ...formData, [field]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({ ...formData, images: files });
      const readers = files.map(file => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prev) => ({ ...prev, images: [...prev.images, reader.result] }));
        };
        reader.readAsDataURL(file);
        return reader;
      });
    }
  };

  const handleRemoveImage = (field) => {
    setFormData({ ...formData, [field]: null });
    setPreview((prev) => ({ ...prev, [field]: null }));
  };

  const handleRemoveShopImage = (index) => {
    const newImages = [...formData.images];
    newImages.splice(index, 1);
    setFormData({ ...formData, images: newImages });
    const newPreviews = [...preview.images];
    newPreviews.splice(index, 1);
    setPreview((prev) => ({ ...prev, images: newPreviews }));
  };

  const handleSubmit = async () => {

    if (!bankVerified) {
      setSnackbarMessage("Please verify your bank details first.");
      setSnackbarOpen(true);
      return;
    }
    const data = new FormData();
    Object.keys(formData).forEach(key => {
      if (key === 'images') {
        formData[key].forEach(file => data.append('images', file));
      } else {
        data.append(key, formData[key]);
      }
    });

    try {
      const response = await vendorRegister(data);
      console.log('Registration successful:', response);
      setSnackbarMessage('Registration successful!');
      setSnackbarOpen(true);
      clearForm();
    } catch (error) {
      console.error('Failed to register:', error);
      setSnackbarMessage('Registration failed. Please try again.');
      setSnackbarOpen(true);
    }
  };

  const clearForm = () => {
    setFormData({
      ownername: '',email: '',businessname: '',businesslocation: '',businesslandmark: '',number: '',address: '',city: '',state: '',pincode: '',
      description: '',storetype: '',password: '',storelogo: null,license: null,images: []});
    setPreview({
      storelogo: null,
      license: null,
      images: []
    });
  };

  const handleBankVerification = async () => {
    try {
      if (!formData.bankAccountNumber.trim() || !formData.ifscCode.trim()) {
        setSnackbarMessage("Please enter both account number and IFSC code");
        setSnackbarOpen(true);
        return;
      }
  
      console.log('Sending verification request for:', {
        accountNumber: formData.bankAccountNumber,
        ifscCode: formData.ifscCode
      });
  
      const response = await verifyBank(
        formData.bankAccountNumber, 
        formData.ifscCode
      );
      
      console.log('Verification response:', response);
      
      if (response.success) {
        setSnackbarMessage(`Verified! Account holder: ${response.data.name}`);
        setBankVerified(true);
        setFormData(prev => ({
          ...prev,
          accountHolderName: response.data.name,
          bankName: response.data.bank
        }));
      } else {
        setSnackbarMessage(response.error || "Bank verification failed");
        setBankVerified(false);
      }
    } catch (error) {
      console.error('Verification error:', error);
      setSnackbarMessage(
        error.response?.data?.error?.message || 
        error.message || 
        "Bank verification error"
      );
      setBankVerified(false);
    } finally {
      setSnackbarOpen(true);
    }
  };

  
  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 4, mt: 4 }}>
        <Typography variant="h6" gutterBottom sx={{ mb: 4, fontFamily: 'Century Gothic' }}>
          <CheckCircleOutlineIcon sx={{ mr: 1 }} />COMPANY NAME & GMAIL ID
        </Typography>
        <Grid container columnSpacing={isMobile ? 2 : 33}>
          <Grid item xs={12} md={6} sx={{ pr: { md: 4 }, px: isMobile ? 2 : 0 }}>
            <Grid container spacing={3} sx={{ borderRadius: 8 }}>
              {['Owner Name', 'Email', 'Business Name', 'Business Location', 'Business Landmark', 'Phone Number'].map((label, index) => (
                <Grid item xs={12} key={index}>
                  <Typography sx={{ fontFamily: 'Century Gothic', paddingBottom: 1 }}>{label}</Typography>
                  <TextField
                    name={label.toLowerCase().replace(' ', '')}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, height: 40 }, width: isMobile ? "100%" : 411 }}
                    fullWidth
                    onChange={handleInputChange}
                    value={formData[label.toLowerCase().replace(' ', '')]}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: 'Century Gothic', paddingBottom: 1 }}>Logo</Typography>
                <UploadBox
                  title="Logo"
                  onFileChange={(e) => handleFileChange(e, 'storelogo')}
                />
                {preview.storelogo && (
                  <Box sx={{ mt: 2, position: 'relative', width: '100%', maxWidth: 200 }}>
                    <img
                      src={preview.storelogo}
                      alt="Logo Preview"
                      style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                      onClick={() => handleRemoveImage('storelogo')}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} md={6} sx={{ pl: { md: 4 }, px: isMobile ? 2 : 0 }}>
            <Grid container spacing={3}>
              {['Address', 'City', 'State', 'Pincode', 'Description', 'Store Type', 'Password'].map((label, index) => (
                <Grid item xs={12} key={index}>
                  <Typography sx={{ fontFamily: 'Century Gothic', paddingBottom: 1 }}>{label}</Typography>
                  <TextField
                    name={label.toLowerCase().replace(' ', '')}
                    sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, height: 40 }, width: isMobile ? "100%" : 411 }}
                    fullWidth
                    onChange={handleInputChange}
                    value={formData[label.toLowerCase().replace(' ', '')]}
                  />
                </Grid>
              ))}
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: 'Century Gothic', paddingBottom: 1 }}>Shop Image</Typography>
                <UploadBox
                  title="Shop Image"
                  onFileChange={handleImagesChange}
                />
                {preview.images.map((img, index) => (
                  <Box key={index} sx={{ mt: 2, position: 'relative', width: '100%', maxWidth: 200 }}>
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                      onClick={() => handleRemoveShopImage(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Grid>
              <Grid item xs={12}>
                <Typography sx={{ fontFamily: 'Century Gothic', paddingBottom: 1 }}>License</Typography>
                <UploadBox
                  title="License"
                  onFileChange={(e) => handleFileChange(e, 'license')}
                />
                {preview.license && (
                  <Box sx={{ mt: 2, position: 'relative', width: '100%', maxWidth: 200 }}>
                    <img
                      src={preview.license}
                      alt="License Preview"
                      style={{ width: '100%', height: 'auto', borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{ position: 'absolute', top: 0, right: 0, color: 'red' }}
                      onClick={() => handleRemoveImage('license')}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Grid>
              {/* Move Policy Checkbox and Register Button here */}
              <Grid item xs={12} sx={{ mt: 4 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" />}
                  label="By Continuing, I Agree To Rigsdock Terms Of Use & Privacy Policy"
                />
              </Grid>
              <Grid item xs={12} md={6}>
  <TextField 
    fullWidth 
    label="Bank Account Number" 
    name="bankAccountNumber" 
    onChange={handleInputChange} 
    value={formData.bankAccountNumber}
    required
  />
  <TextField 
    fullWidth 
    label="IFSC Code" 
    name="ifscCode" 
    onChange={handleInputChange} 
    value={formData.ifscCode} 
    sx={{ mt: 2 }} 
    required
  />
  <Button 
    variant="contained" 
    onClick={handleBankVerification} 
    sx={{ mt: 2 }} 
    disabled={bankVerified || !formData.bankAccountNumber || !formData.ifscCode}
  >
    Verify Bank Details
  </Button>
</Grid>
              <Grid item xs={12} sx={{ display: "flex", justifyContent: "flex-end", alignItems: "center" }}>
                <Button
                  variant="contained"
                  sx={{
                    mt: 2,
                    mb: 4,
                    bgcolor: "#0052CC",
                    "&:hover": { bgcolor: "#1D81F2" },
                    borderRadius: 8,
                    fontSize: 15
                  }}
                  onClick={handleSubmit}
                >
                  Register & Continue
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity="success"
          action={
            <IconButton size="small" aria-label="close" color="inherit" onClick={handleCloseSnackbar}>
              <CloseIcon fontSize="small" />
            </IconButton>
          }
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default BecomeSeller;