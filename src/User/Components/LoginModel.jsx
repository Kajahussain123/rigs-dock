import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, InputAdornment, IconButton, CircularProgress } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import LockIcon from "@mui/icons-material/Lock";
import FlagIcon from "@mui/icons-material/Flag";
import { toast } from "react-toastify";
import { registerWithMobile, sendOTP, verifyOTP } from "../../Services/allApi";

const LoginModal = ({ show, handleClose }) => {
  const [step, setStep] = useState(1); // 1: Mobile, 2: OTP, 3: Register
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState({
    sendOTP: false,
    verifyOTP: false,
    register: false
  });

  // Send OTP
  const handleSendOTP = async () => {
    if (mobile.length !== 10) {
      toast.error("Please enter a valid 10-digit mobile number");
      return;
    }

    setLoading(prev => ({ ...prev, sendOTP: true }));
    
    try {
      const response = await sendOTP(mobile);
      console.log("Send OTP Response:", response);
      
      if (response.message === "OTP sent successfully" && response.sessionId) {
        localStorage.setItem('sessionId', response.sessionId);
        setStep(2);
        toast.success("OTP sent successfully!");
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
      const response = await verifyOTP(mobile, otp.join(""));
      console.log("Verify OTP Response:", response);
      
      if (response.userId && response.token) {
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("token", response.token);
        toast.success("Login successful!");
        handleClose();
      } else if (response.redirectToRegister) {
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

  // Register User
  const handleRegisterUser = async () => {
    if (!name || !email) {
      toast.error("Please enter all fields");
      return;
    }

    setLoading(prev => ({ ...prev, register: true }));
    
    try {
      const response = await registerWithMobile(name, email, mobile);
      console.log("Register User Response:", response);
      
      if (response.userId && response.token) {
        localStorage.setItem("userId", response.userId);
        localStorage.setItem("token", response.token);
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

        {/* Step 1: Enter Mobile Number */}
        {step === 1 && (
          <>
            <Typography variant="h6" sx={{ fontWeight: "bold", mb: 1, fontFamily: `"Montserrat", sans-serif` }}>
              Sign-in / Sign-up
            </Typography>
            <Typography variant="body1" sx={{ fontWeight: "bold", mt: 2, fontFamily: `"Montserrat", sans-serif` }}>
              Enter Mobile Number
            </Typography>
            <Typography variant="body2" sx={{ color: "gray", mb: 2, fontFamily: `"Montserrat", sans-serif` }}>
              Enter 10-digit mobile number to proceed
            </Typography>

            <TextField
              fullWidth
              variant="outlined"
              placeholder="Enter Mobile Number"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
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
              Sent to +91 {mobile}
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
              Register Your Account
            </Typography>
            <TextField fullWidth label="Full Name" variant="outlined" value={name} onChange={(e) => setName(e.target.value)} margin="dense" />
            <TextField fullWidth label="Email Address" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} margin="dense" />

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