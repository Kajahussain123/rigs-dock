import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import Header from "../Components/Header";

const TermsAndConditions = () => {
  return (
    <div>
        <Header></Header>
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Terms and Conditions
          </Typography>
    
          <Divider sx={{ mb: 2 }} />
    
          {/* Introduction */}
          <Typography variant="body1" gutterBottom>
            Welcome to our computer equipment e-commerce website. By accessing or purchasing from our website, you agree to abide by the following terms and conditions. Please read them carefully.
          </Typography>
    
          {/* Section 1: General Terms */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">1. General Terms</Typography>
            <Typography variant="body1">
              - You must be at least 18 years old to make a purchase. <br />
              - All products listed are subject to availability. <br />
              - We reserve the right to refuse service to anyone for any reason.  
            </Typography>
          </Box>
    
          {/* Section 2: Orders and Payments */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">2. Orders and Payments</Typography>
            <Typography variant="body1">
              - Orders will be processed after payment is successfully received. <br />
              - We accept payments via Razorpay, credit/debit cards, and UPI. <br />
              - Prices are subject to change without prior notice.  
            </Typography>
          </Box>
    
          {/* Section 3: Shipping and Delivery */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">3. Shipping and Delivery</Typography>
            <Typography variant="body1">
              - Shipping times may vary depending on location and availability. <br />
              - We are not responsible for delays caused by courier services. <br />
              - International shipping fees and customs duties are the buyer's responsibility.  
            </Typography>
          </Box>
    
          {/* Section 4: Returns and Refunds */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">4. Returns and Refunds</Typography>
            <Typography variant="body1">
              - Returns are accepted within 7 days of delivery, provided the product is unused and in its original packaging. <br />
              - Refunds will be processed after inspection of the returned item. <br />
              - Damaged products must be reported within 24 hours of delivery.  
            </Typography>
          </Box>
    
          {/* Section 5: Warranty Policy */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">5. Warranty Policy</Typography>
            <Typography variant="body1">
              - Warranty is provided as per the manufacturer’s terms. <br />
              - Physical damage or unauthorized repairs void the warranty. <br />
              - Warranty claims must be processed through customer support.  
            </Typography>
          </Box>
    
          {/* Section 6: User Accounts */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">6. User Accounts</Typography>
            <Typography variant="body1">
              - You are responsible for maintaining the confidentiality of your account. <br />
              - Any unauthorized access or breach should be reported immediately. <br />
              - We reserve the right to suspend or terminate accounts for fraudulent activities.  
            </Typography>
          </Box>
    
          {/* Section 7: Limitation of Liability */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">7. Limitation of Liability</Typography>
            <Typography variant="body1">
              - We are not responsible for indirect or consequential damages resulting from product use. <br />
              - In no case shall our liability exceed the purchase amount of the product.  
            </Typography>
          </Box>
    
          {/* Section 8: Changes to Terms */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">8. Changes to Terms</Typography>
            <Typography variant="body1">
              - We reserve the right to update these terms at any time. <br />
              - It is your responsibility to review this page periodically for updates.  
            </Typography>
          </Box>
    
          <Typography variant="body1" sx={{ mt: 4 }}>
            If you have any questions regarding these Terms and Conditions, please contact us at{" "}
            <strong>support@rigsdock.com</strong>.
          </Typography>
        </Container>
    </div>
  );
};

export default TermsAndConditions;
