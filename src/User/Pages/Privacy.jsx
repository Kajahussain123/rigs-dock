import React from "react";
import { Container, Typography, Divider, Box } from "@mui/material";
import Header from "../Components/Header";

const PrivacyPolicy = () => {
  return (
    <div>
      <Header></Header>
      <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
        <Typography variant="h4" fontWeight="bold" gutterBottom>
          Privacy Policy
        </Typography>

        <Divider sx={{ mb: 2 }} />

        {/* Introduction */}
        <Typography variant="body1" gutterBottom>
          At RigsDock, we respect your privacy and are committed to protecting your personal information. This Privacy Policy explains how we collect, use, and safeguard your data when you visit our website.
        </Typography>

        {/* Section 1: Information Collection */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">1. Information We Collect</Typography>
          <Typography variant="body1">
            - Personal information such as name, email, phone number, and billing address when you make a purchase. <br />
            - Payment details are processed securely through third-party gateways (e.g., Razorpay). <br />
            - Technical data such as IP address, browser type, and device information.  
          </Typography>
        </Box>

        {/* Section 2: How We Use Your Information */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">2. How We Use Your Information</Typography>
          <Typography variant="body1">
            - To process orders and payments. <br />
            - To improve our website experience and customer service. <br />
            - To send promotional emails and updates (you can opt out anytime).  
          </Typography>
        </Box>

        {/* Section 3: Data Security */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">3. Data Security</Typography>
          <Typography variant="body1">
            - We implement industry-standard security measures to protect your data. <br />
            - We do not store sensitive payment details on our servers. <br />
            - While we strive for security, no method of transmission over the internet is 100% secure.  
          </Typography>
        </Box>

        {/* Section 4: Sharing of Information */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">4. Sharing of Information</Typography>
          <Typography variant="body1">
            - We do not sell or rent your personal data to third parties. <br />
            - We may share information with trusted partners for payment processing and delivery. <br />
            - Legal compliance: We may disclose data if required by law.  
          </Typography>
        </Box>

        {/* Section 5: Cookies and Tracking */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">5. Cookies and Tracking</Typography>
          <Typography variant="body1">
            - Our website uses cookies to improve user experience. <br />
            - You can disable cookies in your browser settings. <br />
            - Third-party analytics tools may collect anonymous usage data.  
          </Typography>
        </Box>

        {/* Section 6: Your Rights */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">6. Your Rights</Typography>
          <Typography variant="body1">
            - You can request access, correction, or deletion of your personal data. <br />
            - You have the right to opt out of marketing communications. <br />
            - Contact us for any privacy-related concerns.  
          </Typography>
        </Box>

        {/* Section 7: Changes to Policy */}
        <Box sx={{ mt: 3 }}>
          <Typography variant="h6" fontWeight="bold">7. Changes to This Policy</Typography>
          <Typography variant="body1">
            - We may update this Privacy Policy from time to time. <br />
            - The latest version will always be available on our website. <br />
            - Continued use of our site implies acceptance of changes.  
          </Typography>
        </Box>

        <Typography variant="body1" sx={{ mt: 4 }}>
          If you have any questions about our Privacy Policy, please contact us at <strong>support@rigsdock.com</strong>.
        </Typography>
      </Container>
    </div>
  );
};

export default PrivacyPolicy;
