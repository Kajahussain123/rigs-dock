import React from 'react';
import { 
  Box, 
  Typography, 
  Stepper, 
  Step, 
  StepLabel, 
  StepContent,
  Paper,
  Card,
  CardContent,
  Divider,
  Grid,
  Chip,
  LinearProgress,
  Avatar
} from '@mui/material';
import {
  LocalShipping,
  CheckCircle,
  AccessTime,
  LocationOn,
  Assignment,
  Person,
  Home,
  Phone,
  Email
} from '@mui/icons-material';

const TrackingPage = () => {
  // Sample tracking data
  const trackingData = {
    trackingNumber: 'SH123456789',
    status: 'In Transit',
    progress: 75,
    carrier: 'FedEx',
    estimatedDelivery: 'March 30, 2023',
    shippedOn: 'March 25, 2023',
    weight: '2.5 kg',
    dimensions: '30 × 20 × 15 cm',
    origin: 'New York, USA',
    destination: 'London, UK',
    steps: [
      {
        label: 'Order Placed',
        description: 'Your order has been received',
        date: 'March 25, 2023 - 10:30 AM',
        completed: true
      },
      {
        label: 'Processing',
        description: 'Seller is preparing your order',
        date: 'March 25, 2023 - 2:15 PM',
        completed: true
      },
      {
        label: 'Shipped',
        description: 'Your package has left the facility',
        date: 'March 26, 2023 - 9:45 AM',
        completed: true
      },
      {
        label: 'In Transit',
        description: 'Your package is on its way',
        date: 'March 27, 2023 - 11:20 AM',
        completed: false,
        active: true
      },
      {
        label: 'Out for Delivery',
        description: '',
        date: '',
        completed: false
      },
      {
        label: 'Delivered',
        description: '',
        date: '',
        completed: false
      }
    ],
    sender: {
      name: 'Amazon Inc.',
      address: '123 Main St, New York, NY 10001, USA',
      phone: '+1 800-123-4567',
      email: 'support@amazon.com'
    },
    recipient: {
      name: 'John Doe',
      address: '456 High St, London, UK',
      phone: '+44 20 1234 5678',
      email: 'john.doe@example.com'
    }
  };

  const getStatusIcon = () => {
    switch(trackingData.status) {
      case 'Delivered':
        return <CheckCircle color="success" sx={{ fontSize: 40 }} />;
      case 'In Transit':
        return <LocalShipping color="primary" sx={{ fontSize: 40 }} />;
      default:
        return <AccessTime color="warning" sx={{ fontSize: 40 }} />;
    }
  };

  return (
    <Box sx={{ maxWidth: 1200, margin: '0 auto', p: 3 }}>
      <Typography variant="h4" gutterBottom sx={{ fontWeight: 'bold', mb: 4 }}>
        Track Your Shipment
      </Typography>
      
      {/* Tracking Summary Card */}
      <Card elevation={3} sx={{ mb: 4 }}>
        <CardContent>
          <Grid container spacing={3} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Avatar sx={{ bgcolor: 'primary.light', width: 60, height: 60 }}>
                  {getStatusIcon()}
                </Avatar>
                <Box>
                  <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
                    {trackingData.status}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Tracking #: {trackingData.trackingNumber}
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Carrier
                  </Typography>
                  <Typography variant="body1">{trackingData.carrier}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Shipped On
                  </Typography>
                  <Typography variant="body1">{trackingData.shippedOn}</Typography>
                </Box>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    Estimated Delivery
                  </Typography>
                  <Typography variant="body1">{trackingData.estimatedDelivery}</Typography>
                </Box>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ mt: 3 }}>
            <LinearProgress 
              variant="determinate" 
              value={trackingData.progress} 
              sx={{ height: 10, borderRadius: 5 }} 
            />
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
              <Typography variant="caption">Order Placed</Typography>
              <Typography variant="caption">Delivered</Typography>
            </Box>
          </Box>
        </CardContent>
      </Card>
      
      <Grid container spacing={4}>
        {/* Tracking Timeline */}
        <Grid item xs={12} md={7}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 3 }}>
              Shipment Progress
            </Typography>
            
            <Stepper orientation="vertical">
              {trackingData.steps.map((step, index) => (
                <Step key={step.label} active={step.active} completed={step.completed}>
                  <StepLabel 
                    optional={step.date && (
                      <Typography variant="caption" color="text.secondary">
                        {step.date}
                      </Typography>
                    )}
                    sx={{
                      '& .MuiStepLabel-label': {
                        fontWeight: step.active ? 'bold' : 'normal',
                        color: step.active ? 'primary.main' : 'inherit'
                      }
                    }}
                  >
                    {step.label}
                  </StepLabel>
                  <StepContent>
                    {step.description && (
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {step.description}
                      </Typography>
                    )}
                    {step.active && (
                      <Chip 
                        label="Current Status" 
                        color="primary" 
                        size="small" 
                        sx={{ mt: 1 }} 
                      />
                    )}
                  </StepContent>
                </Step>
              ))}
            </Stepper>
          </Paper>
        </Grid>
        
        {/* Package and Address Details */}
        <Grid item xs={12} md={5}>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
            {/* Package Details */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                <Assignment sx={{ verticalAlign: 'middle', mr: 1 }} />
                Package Details
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Weight
                  </Typography>
                  <Typography variant="body1">{trackingData.weight}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Dimensions
                  </Typography>
                  <Typography variant="body1">{trackingData.dimensions}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Origin
                  </Typography>
                  <Typography variant="body1">{trackingData.origin}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Destination
                  </Typography>
                  <Typography variant="body1">{trackingData.destination}</Typography>
                </Grid>
              </Grid>
            </Paper>
            
            {/* Sender Details */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                <Person sx={{ verticalAlign: 'middle', mr: 1 }} />
                Sender Details
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">{trackingData.sender.address}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">{trackingData.sender.phone}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">{trackingData.sender.email}</Typography>
              </Box>
            </Paper>
            
            {/* Recipient Details */}
            <Paper elevation={2} sx={{ p: 3 }}>
              <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
                <Home sx={{ verticalAlign: 'middle', mr: 1 }} />
                Recipient Details
              </Typography>
              
              <Divider sx={{ my: 2 }} />
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <LocationOn color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">{trackingData.recipient.address}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                <Phone color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">{trackingData.recipient.phone}</Typography>
              </Box>
              
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                <Email color="primary" sx={{ mr: 1 }} />
                <Typography variant="body1">{trackingData.recipient.email}</Typography>
              </Box>
            </Paper>
          </Box>
        </Grid>
      </Grid>
      
      {/* Optional: Map Integration */}
      {/* 
      <Paper elevation={2} sx={{ p: 3, mt: 4 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', mb: 2 }}>
          <Map sx={{ verticalAlign: 'middle', mr: 1 }} />
          Shipment Route
        </Typography>
        <Divider sx={{ my: 2 }} />
        <Box sx={{ height: 300, bgcolor: 'grey.200' }}>
          {/* Map component would go here * /}
          <Typography variant="body1" align="center" sx={{ pt: 10 }}>
            Map visualization would be displayed here
          </Typography>
        </Box>
      </Paper>
      */}
    </Box>
  );
};

export default TrackingPage;