import React, { useState } from 'react';
import { IconButton, Menu, MenuItem, Stack, Typography } from '@mui/material';
import { User } from '../../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { logOutUser } from '../../../features/users/usersSlice';

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
      <Stack sx={{ flexGrow: 1 }} direction="row" spacing={5} alignItems="center" justifyContent="center">
        <Typography variant="body1" component={NavLink} to="/trackslist" color="inherit"
                    sx={{ textDecoration: 'none' }}>
          Tracks
        </Typography>
        <Typography variant="body1" component={NavLink} to="/trackshistory" color="inherit"
                    sx={{ textDecoration: 'none' }}>
          Track history
        </Typography>
      </Stack>
      <Stack direction="row" spacing={3} alignItems="center">
        {user.username}
        <IconButton color="inherit" onClick={handleClick} sx={{ display: 'flex' }}>
          <AccountCircleIcon />
        </IconButton>
      </Stack>
      
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem onClick={logOut}>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
