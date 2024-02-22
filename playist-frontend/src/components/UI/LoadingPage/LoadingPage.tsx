import React from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <Box sx={{
      width: '100vw',
      height: '100vh',
      background: 'linear-gradient(0deg, rgba(34,195,127,1) 0%, rgba(9,9,9,0.5816527294511555) 83%)',
      position: 'fixed',
      top: 0,
      bottom: 0,
      left: 0,
      right: 0,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      flexDirection: 'column',
      gap: 2,
      zIndex: 1000,
    }}
    >
      <CircularProgress color="success" />
      <Typography variant="h4" fontWeight="bold">Loading...</Typography>
    </Box>
  );
};

export default LoadingPage;