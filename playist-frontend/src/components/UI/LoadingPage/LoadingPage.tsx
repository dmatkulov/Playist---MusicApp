import React from 'react';
import { Box, CircularProgress } from '@mui/material';

const LoadingPage: React.FC = () => {
  return (
    <Box
      sx={{
        width: '100vw',
        height: '100vh',
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
    </Box>
  );
};

export default LoadingPage;
