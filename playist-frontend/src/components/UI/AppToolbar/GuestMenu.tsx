import React from 'react';
import { Button, Stack } from '@mui/material';
import { NavLink } from 'react-router-dom';

const GuestMenu: React.FC = () => {
  return (
    <Stack direction="row" spacing={3}>
      <Button
        component={NavLink}
        to="/register"
        color="success"
        sx={{ textTransform: 'none' }}
      >
        Sign Up
      </Button>
      <Button
        variant="contained"
        component={NavLink}
        to="/login"
        color="success"
        sx={{ textTransform: 'none' }}
        disableElevation
      >
        Sign In
      </Button>
    </Stack>
  );
};

export default GuestMenu;
