import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import FlagIcon from "@mui/icons-material/Flag";
import EmailIcon from "@mui/icons-material/Email";
import { toast } from "react-toastify";
import { sendOTP, verifyOTP, completeRegistration } from "../../Services/allApi";

const LoginModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); // 1: Identifier, 2: OTP, 3: Register
  const [identifier, setIdentifier] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [loading, setLoading] = useState({
    sendOTP: false,
    verifyOTP: false,
    register: false
  });
  const [identifierType, setIdentifierType] = useState(null); // 'email' or 'mobile'
  const [registrationData, setRegistrationData] = useState({});

  // Check if identifier is email
  const isEmail = (id) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(id);
  };

  // Send OTP to email or mobile
  const handleSendOTP = async () => {
    if (!identifier) {
      toast.error("Please enter your email or mobile number");
      return;
    }

    const isEmailInput = isEmail(identifier);
    setIdentifierType(isEmailInput ? 'email' : 'mobile');

    setLoading(prev => ({ ...prev, sendOTP: true }));
    
    try {
      const response = await sendOTP(identifier);
      console.log("Send OTP Response:", response);
      
      if (response.message && (response.identifierType === 'email' || response.identifierType === 'mobile')) {
        setStep(2);
        toast.success(`OTP sent to your ${isEmailInput ? 'email' : 'mobile'}!`);
      } else {
        toast.error(response.message || "Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      toast.error(error.response?.data?.message || "Error sending OTP");
    } finally {
      setLoading(prev => ({ ...prev, sendOTP: false }));
    }
  };

  // Verify OTP
  const handleVerifyOTP = async () => {
    if (otp.join("").length !== 6) {
      toast.error("Please enter a valid 6-digit OTP");
      return;
    }

    setLoading(prev => ({ ...prev, verifyOTP: true }));
    
    try {
      const response = await verifyOTP({
        identifier,
        otp: otp.join(""),
        identifierType
      });
      
      console.log("Verify OTP Response:", response);
      
      if (response.token && response.userId) {
        // Login successful
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        toast.success("Login successful!");
        handleClose();
      } else if (response.needsRegistration) {
        // Need to register
        setRegistrationData({
          [identifierType]: identifier,
          requires: identifierType === 'email' ? 'mobileNumber' : 'email'
        });
        setStep(3);
        toast.info("Please complete your registration");
      } else {
        toast.error(response.message || "Invalid OTP");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      toast.error(error.response?.data?.message || "Error verifying OTP");
    } finally {
      setLoading(prev => ({ ...prev, verifyOTP: false }));
    }
  };

  // Complete registration
  const handleRegisterUser = async () => {
    if (!name || (!email && !mobileNumber)) {
      toast.error("Please enter all required fields");
      return;
    }

    setLoading(prev => ({ ...prev, register: true }));
    
    try {
      const userData = {
        name,
        email: identifierType === 'email' ? identifier : email,
        mobileNumber: identifierType === 'mobile' ? identifier : mobileNumber
      };

      const response = await completeRegistration(userData);
      
      if (response.token && response.userId) {
        localStorage.setItem("token", response.token);
        localStorage.setItem("userId", response.userId);
        toast.success("Registration successful!");
        handleClose();
      } else {
        toast.error(response.message || "Registration failed");
      }
    } catch (error) {
      console.error("Error registering user:", error);
      toast.error(error.response?.data?.message || "Error registering user");
    } finally {
      setLoading(prev => ({ ...prev, register: false }));
    }
  };

  // Handle OTP input
  const handleOTPChange = (index, value) => {
    if (!isNaN(value)) {
      let newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value && index < otp.length - 1) {
        document.getElementById(`otp-${index + 1}`).focus();
      }
    }
  };

  return (
    <Modal open={show} onClose={handleClose}>
      <Box
        sx={{
          width: { xs: "90%", sm: "400px" },
          bgcolor: "white",
          borderRadius: "12px",
          boxShadow: 24,
          padding: "24px",
          margin: "auto",
          mt: "10%",
          position: "relative",
          textAlign: "center",
        }}
      >
        {/* Close Button */}
        <IconButton onClick={handleClose} sx={{ position: "absolute", top: "12px", right: "12px" }}>
          <CloseIcon />
        </IconButton>

        {/* Step 1: Enter Email or Mobile */}
        {step === 1 && (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontFamily: `"Montserrat", sans-serif` }}>
              Sign-in / Sign-up
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2, fontFamily: `"Montserrat", sans-serif` }}>
              Enter Email or Mobile Number
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2, fontFamily: `"Montserrat", sans-serif` }}>
              We'll send you an OTP to verify
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Email or Mobile Number"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    {isEmail(identifier) ? (
                      <EmailIcon sx={{ color: "#ff9800", fontSize: 20 }} />
                    ) : (
                      <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f4f4f4", px: 1, borderRadius: "4px" }}>
                        <FlagIcon sx={{ color: "#ff9800", fontSize: 20 }} />
                        <Typography sx={{ ml: 1, fontSize: "14px" }}>+91</Typography>
                      </Box>
                    )}
                  </InputAdornment>
                ),
              }}
            />

            <Button
              fullWidth
              variant="contained"
              sx={{
                fontFamily: `"Montserrat", sans-serif`,
                mt: 2,
                bgcolor: "#0A5FBF",
                ":hover": { bgcolor: "#000000" },
                height: "44px"
              }}
              onClick={handleSendOTP}
              disabled={loading.sendOTP}
            >
              {loading.sendOTP ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Continue"
              )}
            </Button>
          </>
        )}

        {/* Step 2: Enter OTP */}
        {step === 2 && (
          <>
            <LockIcon sx={{ fontSize: 50, color: "#00acc1", mb: 2 }} />
            <Typography variant="h6" sx={{ fontWeight: "bold", fontFamily: `"Montserrat", sans-serif` }}>
              Enter OTP
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2, fontFamily: `"Montserrat", sans-serif` }}>
              Sent to {identifierType === 'email' ? identifier : `+91 ${identifier}`}
            </Typography>

            <Box sx={{ display: "flex", justifyContent: "center", gap: 1, mb: 2 }}>
              {otp.map((value, index) => (
                <TextField
                  key={index}
                  id={`otp-${index}`}
                  variant="outlined"
                  inputProps={{ maxLength: 1, style: { textAlign: "center" } }}
                  value={value}
                  onChange={(e) => handleOTPChange(index, e.target.value)}
                  sx={{ width: 40 }}
                />
              ))}
            </Box>

            <Button
              fullWidth
              variant="contained"
              sx={{
                fontFamily: `"Montserrat", sans-serif`,
                bgcolor: "#121212",
                ":hover": { bgcolor: "#000000" },
                height: "44px"
              }}
              onClick={handleVerifyOTP}
              disabled={loading.verifyOTP}
            >
              {loading.verifyOTP ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Continue"
              )}
            </Button>
          </>
        )}

        {/* Step 3: Register User */}
        {step === 3 && (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 2, fontFamily: `"Montserrat", sans-serif` }}>
              Complete Registration
            </Typography>
            
            <TextField 
              fullWidth 
              label="Full Name" 
              variant="outlined" 
              value={name} 
              onChange={(e) => setName(e.target.value)} 
              margin="dense" 
            />
            
            {identifierType === 'email' ? (
              <>
                <TextField 
                  fullWidth 
                  label="Email" 
                  variant="outlined" 
                  value={identifier} 
                  margin="dense"
                  disabled
                />
                <TextField 
                  fullWidth 
                  label="Mobile Number" 
                  variant="outlined" 
                  value={mobileNumber} 
                  onChange={(e) => setMobileNumber(e.target.value)} 
                  margin="dense"
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f4f4f4", px: 1, borderRadius: "4px" }}>
                          <FlagIcon sx={{ color: "#ff9800", fontSize: 20 }} />
                          <Typography sx={{ ml: 1, fontSize: "14px" }}>+91</Typography>
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
              </>
            ) : (
              <>
                <TextField 
                  fullWidth 
                  label="Mobile Number" 
                  variant="outlined" 
                  value={identifier} 
                  margin="dense"
                  disabled
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <Box sx={{ display: "flex", alignItems: "center", bgcolor: "#f4f4f4", px: 1, borderRadius: "4px" }}>
                          <FlagIcon sx={{ color: "#ff9800", fontSize: 20 }} />
                          <Typography sx={{ ml: 1, fontSize: "14px" }}>+91</Typography>
                        </Box>
                      </InputAdornment>
                    ),
                  }}
                />
                <TextField 
                  fullWidth 
                  label="Email" 
                  variant="outlined" 
                  value={email} 
                  onChange={(e) => setEmail(e.target.value)} 
                  margin="dense"
                />
              </>
            )}

            <Button
              fullWidth
              variant="contained"
              sx={{
                fontFamily: `"Montserrat", sans-serif`,
                mt: 2,
                bgcolor: "#121212",
                ":hover": { bgcolor: "#000000" },
                height: "44px"
              }}
              onClick={handleRegisterUser}
              disabled={loading.register}
            >
              {loading.register ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Register & Login"
              )}
            </Button>
          </>
        )}
      </Box>
    </Modal>
  );
};

export default LoginModal;