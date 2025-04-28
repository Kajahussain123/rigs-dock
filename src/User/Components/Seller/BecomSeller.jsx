import React, { useState } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import {
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Grid,
  FormControlLabel,
  Checkbox,
  Container,
  Snackbar,
  Alert,
  IconButton,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
  CircularProgress,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CloseIcon from "@mui/icons-material/Close";
import {
  vendorRegister,
  verifyaccount,
  verifygst,
  verifypan,
} from "../../../Services/allApi";

const daysOfWeek = [
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
  "Sunday",
];

const timeOptions = [
  "12:00 AM",
  "12:30 AM",
  "1:00 AM",
  "1:30 AM",
  "2:00 AM",
  "2:30 AM",
  "3:00 AM",
  "3:30 AM",
  "4:00 AM",
  "4:30 AM",
  "5:00 AM",
  "5:30 AM",
  "6:00 AM",
  "6:30 AM",
  "7:00 AM",
  "7:30 AM",
  "8:00 AM",
  "8:30 AM",
  "9:00 AM",
  "9:30 AM",
  "10:00 AM",
  "10:30 AM",
  "11:00 AM",
  "11:30 AM",
  "12:00 PM",
  "12:30 PM",
  "1:00 PM",
  "1:30 PM",
  "2:00 PM",
  "2:30 PM",
  "3:00 PM",
  "3:30 PM",
  "4:00 PM",
  "4:30 PM",
  "5:00 PM",
  "5:30 PM",
  "6:00 PM",
  "6:30 PM",
  "7:00 PM",
  "7:30 PM",
  "8:00 PM",
  "8:30 PM",
  "9:00 PM",
  "9:30 PM",
  "10:00 PM",
  "10:30 PM",
  "11:00 PM",
  "11:30 PM",
];

const UploadBox = ({ title, onFileChange, accept }) => (
  <Box
    sx={{
      border: "2px dashed #ccc",
      borderRadius: 1,
      p: 2,
      width: "100%",
      maxWidth: 200,
      height: 100,
      textAlign: "center",
      cursor: "pointer",
      "&:hover": {
        backgroundColor: "#F5F5F5",
      },
    }}
  >
    <input
      type="file"
      style={{ display: "none" }}
      id={`file-upload-${title}`}
      onChange={onFileChange}
      multiple={title === "Shop Image"}
      accept={accept}
    />
    <label htmlFor={`file-upload-${title}`}>
      <CloudUploadIcon sx={{ fontSize: 30, color: "#888" }} />
      <Typography variant="body2" color="textSecondary" mt={1}>
        Upload {title}
      </Typography>
    </label>
  </Box>
);

const BecomeSeller = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [verificationStatus, setVerificationStatus] = useState({
    bank: { verified: false, message: "" },
    gst: { verified: false, message: "" },
    pan: { verified: false, message: "" },
  });
  const [verifying, setVerifying] = useState({
    bank: false,
    gst: false,
    pan: false,
  });
  const [formData, setFormData] = useState({
    ownername: "",
    email: "",
    businessname: "",
    businesslocation: "",
    businesslandmark: "",
    number: "",
    address: "",
    city: "",
    state: "",
    country: "",
    pincode: "",
    description: "",
    storetype: "",
    password: "",
    openingTime: "",
    closingTime: "",
    workingDays: [],
    storelogo: null,
    license: null,
    images: [],
    accountNumber: "",
    ifscCode: "",
    passbookPhoto: null,
    panNumber: "",
    gstNumber: "",
  });
  const [preview, setPreview] = useState({
    storelogo: null,
    license: null,
    images: [],
    passbookPhoto: null,
  });
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");
  const [errors, setErrors] = useState({});

  const validateForm = () => {
    const newErrors = {};

    if (!formData.number) newErrors.number = "Phone number is required";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters long";
    if (!formData.license) newErrors.license = "License is required";
    if (!formData.openingTime)
      newErrors.openingTime = "Opening time is required";
    if (!formData.closingTime)
      newErrors.closingTime = "Closing time is required";
    if (!formData.country) newErrors.country = "Country is required";
    if (formData.workingDays.length === 0)
      newErrors.workingDays = "At least one working day must be selected";
    // New bank account validations
    if (!formData.accountNumber || !/^\d{9,18}$/.test(formData.accountNumber)) {
      newErrors.accountNumber =
        "Please enter a valid account number (9-18 digits)";
    }
    if (
      !formData.ifscCode ||
      !/^[A-Z]{4}0[A-Z0-9]{6}$/.test(formData.ifscCode)
    ) {
      newErrors.ifscCode = "Please enter a valid IFSC code (e.g., ABCD0123456)";
    }
    if (!formData.passbookPhoto)
      newErrors.passbookPhoto = "Passbook photo is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Clear error for this field when user starts typing again
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    // Clear verification status when related fields change
    if (name === "accountNumber" || name === "ifscCode") {
      setVerificationStatus((prev) => ({
        ...prev,
        bank: { verified: false, message: "" },
      }));
    } else if (name === "gstNumber") {
      setVerificationStatus((prev) => ({
        ...prev,
        gst: { verified: false, message: "" },
      }));
    } else if (name === "panNumber") {
      setVerificationStatus((prev) => ({
        ...prev,
        pan: { verified: false, message: "" },
      }));
    }
  };
  const handleVerifyBank = async () => {
    const { accountNumber, ifscCode } = formData;
    
    if (!accountNumber || !ifscCode) {
      setVerificationStatus((prev) => ({
        ...prev,
        bank: {
          verified: false,
          message: "Account number and IFSC code are required",
        },
      }));
      return;
    }
    
    setVerifying((prev) => ({ ...prev, bank: true }));
    
    try {
      // Using the verifyBank from your imported API functions
      // Make sure this matches the function definition in your Services/allApi.js
      const response = await verifyaccount(accountNumber, ifscCode);
      
      if (response.success) {
        setVerificationStatus((prev) => ({
          ...prev,
          bank: {
            verified: true,
            message: "Bank account verified successfully",
          },
        }));
      } else {
        setVerificationStatus((prev) => ({
          ...prev,
          bank: {
            verified: false,
            message: response.error || "Failed to verify bank account",
          },
        }));
      }
    } catch (error) {
      console.error("Bank verification error:", error);
      setVerificationStatus((prev) => ({
        ...prev,
        bank: { 
          verified: false, 
          message: error.response?.data?.message || "Error verifying bank account" 
        },
      }));
    } finally {
      setVerifying((prev) => ({ ...prev, bank: false }));
    }
  };

  // Handle GST verification
  const handleVerifyGST = async () => {
    const { gstNumber } = formData;

    if (!gstNumber) {
      setVerificationStatus((prev) => ({
        ...prev,
        gst: { verified: false, message: "GST number is required" },
      }));
      return;
    }

    setVerifying((prev) => ({ ...prev, gst: true }));

    try {
      const response = await verifygst(gstNumber);

      if (response.success) {
        setVerificationStatus((prev) => ({
          ...prev,
          gst: { verified: true, message: "GST number verified successfully" },
        }));
      } else {
        setVerificationStatus((prev) => ({
          ...prev,
          gst: {
            verified: false,
            message: response.error || "Failed to verify GST number",
          },
        }));
      }
    } catch (error) {
      setVerificationStatus((prev) => ({
        ...prev,
        gst: { verified: false, message: "Error verifying GST number" },
      }));
    } finally {
      setVerifying((prev) => ({ ...prev, gst: false }));
    }
  };

  // Handle PAN verification
  const handleVerifyPAN = async () => {
    const { panNumber } = formData;

    if (!panNumber) {
      setVerificationStatus((prev) => ({
        ...prev,
        pan: { verified: false, message: "PAN number is required" },
      }));
      return;
    }

    setVerifying((prev) => ({ ...prev, pan: true }));

    try {
      const response = await verifypan(panNumber);

      if (response.success) {
        setVerificationStatus((prev) => ({
          ...prev,
          pan: { verified: true, message: "PAN number verified successfully" },
        }));
      } else {
        setVerificationStatus((prev) => ({
          ...prev,
          pan: {
            verified: false,
            message: response.error || "Failed to verify PAN number",
          },
        }));
      }
    } catch (error) {
      setVerificationStatus((prev) => ({
        ...prev,
        pan: { verified: false, message: "Error verifying PAN number" },
      }));
    } finally {
      setVerifying((prev) => ({ ...prev, pan: false }));
    }
  };

  const handlePassbookPhotoChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type for passbook photo
      const validTypes = ["image/png", "image/jpeg", "image/jpg"];
      if (!validTypes.includes(file.type)) {
        setErrors((prev) => ({
          ...prev,
          passbookPhoto: "Passbook photo must be a PNG, JPG, or JPEG file",
        }));
        return;
      }

      setFormData({ ...formData, passbookPhoto: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, passbookPhoto: reader.result }));
      };
      reader.readAsDataURL(file);

      // Clear error if file is valid
      if (errors.passbookPhoto) {
        setErrors((prev) => ({ ...prev, passbookPhoto: "" }));
      }
    }
  };

  const handleFileChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type for license
      if (field === "license") {
        const validTypes = [
          "application/pdf",
          "application/msword",
          "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
          "image/jpeg",
          "image/jpg",
        ];
        if (!validTypes.includes(file.type)) {
          setErrors((prev) => ({
            ...prev,
            license: "License must be a PDF, DOC, DOCX, JPG, or JPEG file",
          }));
          return;
        }
      }

      setFormData({ ...formData, [field]: file });
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview((prev) => ({ ...prev, [field]: reader.result }));
      };
      reader.readAsDataURL(file);

      // Clear error if file is valid
      if (errors[field]) {
        setErrors((prev) => ({ ...prev, [field]: "" }));
      }
    }
  };

  const handleImagesChange = (e) => {
    const files = Array.from(e.target.files);
    if (files.length > 0) {
      setFormData({ ...formData, images: files });
      const readers = files.map((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview((prev) => ({
            ...prev,
            images: [...prev.images, reader.result],
          }));
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

  const handleWorkingDayChange = (day) => {
    const newWorkingDays = formData.workingDays.includes(day)
      ? formData.workingDays.filter((d) => d !== day)
      : [...formData.workingDays, day];

    setFormData({ ...formData, workingDays: newWorkingDays });

    // Clear error if working days are selected
    if (newWorkingDays.length > 0 && errors.workingDays) {
      setErrors((prev) => ({ ...prev, workingDays: "" }));
    }
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      setSnackbarMessage("Please fix the errors in the form");
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
      return;
    }
  
    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      if (key === "images") {
        formData[key].forEach((file) => data.append("images", file));
      } else if (key === "workingDays") {
        formData[key].forEach((day) => data.append("workingDays", day));
      } else {
        data.append(key, formData[key]);
      }
    });
    
    // Add verification statuses with the exact field names expected by the backend
    data.append("isGstVerified", verificationStatus.gst.verified);
    data.append("isPanVerified", verificationStatus.pan.verified);
    data.append("isBankVerified", verificationStatus.bank.verified);
  
    try {
      const response = await vendorRegister(data);
      console.log("Registration successful:", response);
      setSnackbarMessage("Registration successful!");
      setSnackbarSeverity("success");
      setSnackbarOpen(true);
      clearForm();
    } catch (error) {
      console.error("Failed to register:", error);
      setSnackbarMessage(
        error.response?.data?.message ||
          "Registration failed. Please try again."
      );
      setSnackbarSeverity("error");
      setSnackbarOpen(true);
    }
  };
  const clearForm = () => {
    setFormData({
      ownername: "",
      email: "",
      businessname: "",
      businesslocation: "",
      businesslandmark: "",
      number: "",
      address: "",
      city: "",
      state: "",
      country: "",
      pincode: "",
      description: "",
      storetype: "",
      password: "",
      openingTime: "",
      closingTime: "",
      workingDays: [],
      storelogo: null,
      license: null,
      images: [],
      accountNumber: "",
      ifscCode: "",
      passbookPhoto: null,
    });
    setPreview({
      storelogo: null,
      license: null,
      images: [],
      passbookPhoto: null,
    });
  };

  const handleCloseSnackbar = () => {
    setSnackbarOpen(false);
  };

  return (
    <Container maxWidth="lg">
      <Paper elevation={0} sx={{ p: 4, mt: 4 }}>
        <Typography
          variant="h6"
          gutterBottom
          sx={{ mb: 4, fontFamily: "Century Gothic" }}
        >
          <CheckCircleOutlineIcon sx={{ mr: 1 }} />
          COMPANY NAME & GMAIL ID
        </Typography>
        <Grid container columnSpacing={isMobile ? 2 : 33}>
          <Grid
            item
            xs={12}
            md={6}
            sx={{ pr: { md: 4 }, px: isMobile ? 2 : 0 }}
          >
            <Grid container spacing={3} sx={{ borderRadius: 8 }}>
              {[
                "Owner Name",
                "Email",
                "Business Name",
                "Business Location",
                "Business Landmark",
              ].map((label, index) => (
                <Grid item xs={12} key={index}>
                  <Typography
                    sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                  >
                    {label}
                  </Typography>
                  <TextField
                    name={label.toLowerCase().replace(" ", "")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        height: 40,
                      },
                      width: isMobile ? "100%" : 411,
                    }}
                    fullWidth
                    onChange={handleInputChange}
                    value={formData[label.toLowerCase().replace(" ", "")]}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Phone Number
                </Typography>
                <TextField
                  name="number"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, height: 40 },
                    width: isMobile ? "100%" : 411,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.number}
                  error={!!errors.number}
                  helperText={errors.number}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Logo
                </Typography>
                <UploadBox
                  title="Logo"
                  onFileChange={(e) => handleFileChange(e, "storelogo")}
                  accept="image/*"
                />
                {preview.storelogo && (
                  <Box
                    sx={{
                      mt: 2,
                      position: "relative",
                      width: "100%",
                      maxWidth: 200,
                    }}
                  >
                    <img
                      src={preview.storelogo}
                      alt="Logo Preview"
                      style={{ width: "100%", height: "auto", borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                      onClick={() => handleRemoveImage("storelogo")}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
              </Grid>
              <Grid item xs={12}>
                <Typography
                  variant="h6"
                  gutterBottom
                  sx={{ fontFamily: "Century Gothic" }}
                >
                  <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                  BANK ACCOUNT DETAILS
                </Typography>
              </Grid>

              {/* <Grid container spacing={3}> */}
              {/* Bank Account Verification Section */}
              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Account Number
                </Typography>
                <TextField
                  name="accountNumber"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, height: 40 },
                    width: isMobile ? "100%" : 411,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.accountNumber}
                  error={!!errors.accountNumber}
                  helperText={errors.accountNumber}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  IFSC Code
                </Typography>
                <TextField
                  name="ifscCode"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, height: 40 },
                    width: isMobile ? "100%" : 411,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.ifscCode}
                  error={!!errors.ifscCode}
                  helperText={errors.ifscCode}
                  inputProps={{
                    style: { textTransform: "uppercase" },
                  }}
                />
              </Grid>

              {/* Bank Verification Button - Shows when both fields are filled */}
              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleVerifyBank}
                    disabled={
                      verifying.bank ||
                      !formData.accountNumber ||
                      !formData.ifscCode
                    }
                    startIcon={
                      verifying.bank ? <CircularProgress size={20} /> : null
                    }
                    sx={{
                      mr: 2,
                      borderRadius: 4,
                      bgcolor: verificationStatus.bank.verified
                        ? "#E8F5E9"
                        : "#FFF",
                      borderColor: verificationStatus.bank.verified
                        ? "#4CAF50"
                        : "#0052CC",
                      color: verificationStatus.bank.verified
                        ? "#4CAF50"
                        : "#0052CC",
                      "&:hover": {
                        bgcolor: verificationStatus.bank.verified
                          ? "#E8F5E9"
                          : "#F5F5F5",
                      },
                    }}
                  >
                    {verifying.bank
                      ? "Verifying..."
                      : verificationStatus.bank.verified
                      ? "Verified"
                      : "Verify Bank Account"}
                  </Button>
                  {verificationStatus.bank.verified && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "success.main",
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        Bank Account Verified Successfully
                      </Typography>
                    </Box>
                  )}
                </Box>
                {verificationStatus.bank.message &&
                  !verificationStatus.bank.verified && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: "block", mt: 1 }}
                    >
                      {verificationStatus.bank.message}
                    </Typography>
                  )}
                {errors.bankVerification && (
                  <Typography variant="caption" color="error">
                    {errors.bankVerification}
                  </Typography>
                )}
              </Grid>

              {/* GST Verification Section */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  GST Number
                </Typography>
                <TextField
                  name="gstNumber"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, height: 40 },
                    width: isMobile ? "100%" : 411,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.gstNumber}
                  error={!!errors.gstNumber}
                  helperText={errors.gstNumber}
                  inputProps={{
                    style: { textTransform: "uppercase" },
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleVerifyGST}
                    disabled={verifying.gst || !formData.gstNumber}
                    startIcon={
                      verifying.gst ? <CircularProgress size={20} /> : null
                    }
                    sx={{
                      mr: 2,
                      borderRadius: 4,
                      bgcolor: verificationStatus.gst.verified
                        ? "#E8F5E9"
                        : "#FFF",
                      borderColor: verificationStatus.gst.verified
                        ? "#4CAF50"
                        : "#0052CC",
                      color: verificationStatus.gst.verified
                        ? "#4CAF50"
                        : "#0052CC",
                      "&:hover": {
                        bgcolor: verificationStatus.gst.verified
                          ? "#E8F5E9"
                          : "#F5F5F5",
                      },
                    }}
                  >
                    {verifying.gst
                      ? "Verifying..."
                      : verificationStatus.gst.verified
                      ? "Verified"
                      : "Verify GST Number"}
                  </Button>
                  {verificationStatus.gst.verified && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "success.main",
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        GST Number Verified Successfully
                      </Typography>
                    </Box>
                  )}
                </Box>
                {verificationStatus.gst.message &&
                  !verificationStatus.gst.verified && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: "block", mt: 1 }}
                    >
                      {verificationStatus.gst.message}
                    </Typography>
                  )}
                {errors.gstVerification && (
                  <Typography variant="caption" color="error">
                    {errors.gstVerification}
                  </Typography>
                )}
              </Grid>

              {/* PAN Verification Section */}
              <Grid item xs={12} sx={{ mt: 2 }}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  PAN Number
                </Typography>
                <TextField
                  name="panNumber"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, height: 40 },
                    width: isMobile ? "100%" : 411,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.panNumber}
                  error={!!errors.panNumber}
                  helperText={errors.panNumber}
                  inputProps={{
                    style: { textTransform: "uppercase" },
                    maxLength: 10,
                  }}
                />
              </Grid>

              <Grid item xs={12}>
                <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={handleVerifyPAN}
                    disabled={verifying.pan || !formData.panNumber}
                    startIcon={
                      verifying.pan ? <CircularProgress size={20} /> : null
                    }
                    sx={{
                      mr: 2,
                      borderRadius: 4,
                      bgcolor: verificationStatus.pan.verified
                        ? "#E8F5E9"
                        : "#FFF",
                      borderColor: verificationStatus.pan.verified
                        ? "#4CAF50"
                        : "#0052CC",
                      color: verificationStatus.pan.verified
                        ? "#4CAF50"
                        : "#0052CC",
                      "&:hover": {
                        bgcolor: verificationStatus.pan.verified
                          ? "#E8F5E9"
                          : "#F5F5F5",
                      },
                    }}
                  >
                    {verifying.pan
                      ? "Verifying..."
                      : verificationStatus.pan.verified
                      ? "Verified"
                      : "Verify PAN Number"}
                  </Button>
                  {verificationStatus.pan.verified && (
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        color: "success.main",
                      }}
                    >
                      <CheckCircleOutlineIcon sx={{ mr: 1 }} />
                      <Typography variant="body2">
                        PAN Number Verified Successfully
                      </Typography>
                    </Box>
                  )}
                </Box>
                {verificationStatus.pan.message &&
                  !verificationStatus.pan.verified && (
                    <Typography
                      variant="caption"
                      color="error"
                      sx={{ display: "block", mt: 1 }}
                    >
                      {verificationStatus.pan.message}
                    </Typography>
                  )}
                {errors.panVerification && (
                  <Typography variant="caption" color="error">
                    {errors.panVerification}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Passbook Photo
                </Typography>
                <UploadBox
                  title="Passbook Photo"
                  onFileChange={handlePassbookPhotoChange}
                  accept=".png,.jpg,.jpeg"
                />
                {preview.passbookPhoto && (
                  <Box
                    sx={{
                      mt: 2,
                      position: "relative",
                      width: "100%",
                      maxWidth: 200,
                    }}
                  >
                    <img
                      src={preview.passbookPhoto}
                      alt="Passbook Preview"
                      style={{ width: "100%", height: "auto", borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                      onClick={() => handleRemoveImage("passbookPhoto")}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                {errors.passbookPhoto && (
                  <Typography color="error" variant="caption">
                    {errors.passbookPhoto}
                  </Typography>
                )}
              </Grid>
              {/* </Grid> */}
            </Grid>
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            sx={{ pl: { md: 4 }, px: isMobile ? 2 : 0 }}
          >
            <Grid container spacing={3}>
              {[
                "Address",
                "City",
                "State",
                "Country",
                "Pincode",
                "Description",
                "Store Type",
              ].map((label, index) => (
                <Grid item xs={12} key={index}>
                  <Typography
                    sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                  >
                    {label}
                  </Typography>
                  <TextField
                    name={label.toLowerCase().replace(" ", "")}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        height: 40,
                      },
                      width: isMobile ? "100%" : 411,
                    }}
                    fullWidth
                    onChange={handleInputChange}
                    value={formData[label.toLowerCase().replace(" ", "")]}
                    error={!!errors[label.toLowerCase().replace(" ", "")]}
                    helperText={errors[label.toLowerCase().replace(" ", "")]}
                  />
                </Grid>
              ))}

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Password
                </Typography>
                <TextField
                  name="password"
                  type="password"
                  sx={{
                    "& .MuiOutlinedInput-root": { borderRadius: 2, height: 40 },
                    width: isMobile ? "100%" : 411,
                  }}
                  fullWidth
                  onChange={handleInputChange}
                  value={formData.password}
                  error={!!errors.password}
                  helperText={errors.password}
                />
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Opening Time
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="openingTime"
                    value={formData.openingTime}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        height: 40,
                      },
                    }}
                    error={!!errors.openingTime}
                  >
                    {timeOptions.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.openingTime && (
                  <Typography color="error" variant="caption">
                    {errors.openingTime}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} md={6}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Closing Time
                </Typography>
                <FormControl fullWidth>
                  <Select
                    name="closingTime"
                    value={formData.closingTime}
                    onChange={handleInputChange}
                    sx={{
                      "& .MuiOutlinedInput-root": {
                        borderRadius: 2,
                        height: 40,
                      },
                    }}
                    error={!!errors.closingTime}
                  >
                    {timeOptions.map((time, index) => (
                      <MenuItem key={index} value={time}>
                        {time}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                {errors.closingTime && (
                  <Typography color="error" variant="caption">
                    {errors.closingTime}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Working Days
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {daysOfWeek.map((day) => (
                    <FormControlLabel
                      key={day}
                      control={
                        <Checkbox
                          checked={formData.workingDays.includes(day)}
                          onChange={() => handleWorkingDayChange(day)}
                        />
                      }
                      label={day}
                    />
                  ))}
                </Box>
                {errors.workingDays && (
                  <Typography color="error" variant="caption">
                    {errors.workingDays}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  Shop Image
                </Typography>
                <UploadBox
                  title="Shop Image"
                  onFileChange={handleImagesChange}
                  accept="image/*"
                />
                {preview.images.map((img, index) => (
                  <Box
                    key={index}
                    sx={{
                      mt: 2,
                      position: "relative",
                      width: "100%",
                      maxWidth: 200,
                    }}
                  >
                    <img
                      src={img}
                      alt={`Preview ${index}`}
                      style={{ width: "100%", height: "auto", borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                      onClick={() => handleRemoveShopImage(index)}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                ))}
              </Grid>

              <Grid item xs={12}>
                <Typography
                  sx={{ fontFamily: "Century Gothic", paddingBottom: 1 }}
                >
                  License
                </Typography>
                <UploadBox
                  title="License"
                  onFileChange={(e) => handleFileChange(e, "license")}
                  accept=".pdf,.doc,.docx,.jpg,.jpeg"
                />
                {preview.license && (
                  <Box
                    sx={{
                      mt: 2,
                      position: "relative",
                      width: "100%",
                      maxWidth: 200,
                    }}
                  >
                    <img
                      src={preview.license}
                      alt="License Preview"
                      style={{ width: "100%", height: "auto", borderRadius: 4 }}
                    />
                    <IconButton
                      size="small"
                      sx={{
                        position: "absolute",
                        top: 0,
                        right: 0,
                        color: "red",
                      }}
                      onClick={() => handleRemoveImage("license")}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  </Box>
                )}
                {errors.license && (
                  <Typography color="error" variant="caption">
                    {errors.license}
                  </Typography>
                )}
              </Grid>

              <Grid item xs={12} sx={{ mt: 4 }}>
                <FormControlLabel
                  control={<Checkbox color="primary" required />}
                  label="By Continuing, I Agree To Rigsdock Terms Of Use & Privacy Policy"
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
        <Grid
          item
          xs={12}
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            sx={{
              mt: 2,
              mb: 4,
              bgcolor: "#0052CC",
              "&:hover": { bgcolor: "#1D81F2" },
              borderRadius: 8,
              fontSize: 15,
            }}
            onClick={handleSubmit}
          >
            Register
          </Button>
        </Grid>
      </Paper>
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          severity={snackbarSeverity}
          action={
            <IconButton
              size="small"
              aria-label="close"
              color="inherit"
              onClick={handleCloseSnackbar}
            >
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
