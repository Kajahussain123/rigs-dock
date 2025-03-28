import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import Header from "../Components/Header";

const CancellationRefundPolicy = () => {
  return (
    <div>
        <Header></Header>
        <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
          <Typography variant="h4" fontWeight="bold" gutterBottom>
            Cancellation and Refund Policy
          </Typography>
    
          <Divider sx={{ mb: 2 }} />
    
          {/* Introduction */}
          <Typography variant="body1" gutterBottom>
            We strive to provide the best service and products to our customers. However, if you need to cancel an order or request a refund, please review our policy below.
          </Typography>
    
          {/* Section 1: Order Cancellation */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">1. Order Cancellation</Typography>
            <Typography variant="body1">
              - Orders can be canceled **before they are shipped**. Once shipped, cancellations are not allowed. <br />
              - To cancel an order, please contact our support team at <strong>support@rigsdock.com</strong> with your order details. <br />
              - If your cancellation request is approved, a refund will be processed within **7 business days**.  
            </Typography>
          </Box>
    
          {/* Section 2: Refund Eligibility */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">2. Refund Eligibility</Typography>
            <Typography variant="body1">
              - Refunds are only applicable for **defective, damaged, or wrong products**. <br />
              - To be eligible for a refund, the item must be unused and in its **original packaging**. <br />
              - Refunds will not be issued for **products damaged due to misuse, software issues, or unauthorized modifications**.  
            </Typography>
          </Box>
    
          {/* Section 3: Return and Refund Process */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">3. Return and Refund Process</Typography>
            <Typography variant="body1">
              - To request a return, email us at <strong>support@rigsdock.com</strong> within **7 days of receiving the product**. <br />
              - We will arrange a return pickup or guide you on how to ship the item back. <br />
              - After receiving and inspecting the returned item, the refund will be processed within **7-10 business days**.  
            </Typography>
          </Box>
    
          {/* Section 4: Non-Refundable Items */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">4. Non-Refundable Items</Typography>
            <Typography variant="body1">
              - **Digital products, software, and licenses** are non-refundable. <br />
              - Products without original packaging or missing accessories are not eligible for refunds. <br />
              - Clearance sale items or **final sale products** cannot be refunded.  
            </Typography>
          </Box>
    
          {/* Section 5: Refund Methods */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">5. Refund Methods</Typography>
            <Typography variant="body1">
              - Refunds will be processed using the **original payment method**. <br />
              - If paid via Razorpay, the amount will be credited to the same account. <br />
              - Credit/debit card refunds may take **5-7 business days** to reflect in your bank statement.  
            </Typography>
          </Box>
    
          {/* Section 6: Late or Missing Refunds */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">6. Late or Missing Refunds</Typography>
            <Typography variant="body1">
              - If you haven’t received your refund yet, check your bank account again. <br />
              - Contact your credit card company, as refunds may take time to process. <br />
              - If you still have issues, please reach out to us at **support@rigsdock.com**.  
            </Typography>
          </Box>
    
          {/* Section 7: Changes to Policy */}
          <Box sx={{ mt: 3 }}>
            <Typography variant="h6" fontWeight="bold">7. Changes to This Policy</Typography>
            <Typography variant="body1">
              - We reserve the right to modify this policy at any time. <br />
              - Changes will be updated on this page, and it is your responsibility to review them periodically.  
            </Typography>
          </Box>
    
          <Typography variant="body1" sx={{ mt: 4 }}>
            If you have any questions regarding our **Cancellation and Refund Policy**, please contact us at{" "}
            <strong>support@rigsdock.com</strong>.
          </Typography>
        </Container>
    </div>
  );
};

export default CancellationRefundPolicy;
