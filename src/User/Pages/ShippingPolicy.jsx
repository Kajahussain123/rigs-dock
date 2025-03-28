import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import Header from "../Components/Header";

const ShippingPolicy = () => {
  return (
    <div>
      <Header></Header>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Shipping Policy
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Introduction */}
        <Typography variant="body1" gutterBottom>
          At RigsDock, we partner with **Shiprocket** to provide fast and reliable shipping services. This Shipping Policy outlines the shipping process, delivery timeframes, and associated charges.
        </Typography>

        {/* Section 1: Shipping Coverage */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">1. Shipping Coverage</Typography>
          <Typography variant="body1">
            - We deliver across India using **Shiprocket** logistics partners. <br />
            - International shipping is available for select countries; additional charges apply. <br />
            - Certain remote locations may have longer delivery times.
          </Typography>
        </Box>

        {/* Section 2: Processing Time */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">2. Order Processing Time</Typography>
          <Typography variant="body1">
            - Orders are processed within **1-2 business days** after payment confirmation. <br />
            - Orders placed on weekends or holidays will be processed on the next business day. <br />
            - You will receive an email with tracking details once your order is shipped.
          </Typography>
        </Box>

        {/* Section 3: Shipping Timeframes */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">3. Estimated Delivery Time</Typography>
          <Typography variant="body1">
            - **Standard Delivery**: 5-7 business days. <br />
            - **Express Delivery**: 2-4 business days (available in select locations). <br />
            - Delivery times may vary due to unforeseen circumstances such as weather or courier delays.
          </Typography>
        </Box>

        {/* Section 4: Shipping Charges */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">4. Shipping Charges</Typography>
          <Typography variant="body1">
            - **Standard Shipping**: ₹50 for orders below ₹1000, free for orders above ₹1000. <br />
            - **Express Shipping**: Additional charges apply based on location. <br />
            - International shipping fees depend on destination and weight.
          </Typography>
        </Box>

        {/* Section 5: Tracking Orders */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">5. Order Tracking</Typography>
          <Typography variant="body1">
            - Once shipped, you will receive a **tracking link via email/SMS**. <br />
            - You can track your order on the **Shiprocket tracking page**. <br />
            - For any tracking issues, contact our support team at **support@rigsdock.com**.
          </Typography>
        </Box>

        {/* Section 6: Delays & Issues */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">6. Delays & Shipping Issues</Typography>
          <Typography variant="body1">
            - Delays may occur due to unforeseen reasons (weather, strikes, courier issues). <br />
            - If your order is delayed beyond the estimated timeframe, contact our support team. <br />
            - We are not responsible for lost or stolen packages once marked as delivered.
          </Typography>
        </Box>

        {/* Section 7: Contact Us */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">7. Contact Us</Typography>
          <Typography variant="body1">
            - For any shipping-related inquiries, contact us at **support@rigsdock.com**. <br />
            - Our support team is available Monday to Friday, 9 AM - 6 PM (IST).
          </Typography>
        </Box>
      </Container>
    </div>
  );
};

export default ShippingPolicy;
