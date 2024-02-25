import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack, Tooltip, Typography } from '@mui/material';
import { User } from '../../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logOutUser } from '../../../features/users/usersSlice';
import LogoutIcon from '@mui/icons-material/Logout';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  
  const logOut = () => {
    dispatch(logOutUser(null));
    navigate('/');
  };
  
  return (
    <>
      <Stack
        sx={{ flexGrow: 1 }}
        direction="row"
        spacing={5}
        alignItems="center"
        justifyContent="center"
      >
        <Typography
          variant="body1"
          component={NavLink}
          to="/trackshistory"
          color="inherit"
          sx={{ textDecoration: 'none' }}
        >
          Recently played
        </Typography>
      </Stack>
      <IconButton
        color="inherit"
        onClick={handleClick}
        sx={{ display: 'flex', gap: 1 }}
        disableRipple
      >
        <Tooltip title={user.username}>
          <AccountCircleIcon color="secondary" />
        </Tooltip>
      </IconButton>
      
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
        sx={{ mt: 2 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <MenuItem onClick={logOut}>
          <LogoutIcon sx={{ mr: 2 }} />
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
