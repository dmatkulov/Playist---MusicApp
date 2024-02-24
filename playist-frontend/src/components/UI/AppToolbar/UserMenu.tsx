import React, { useState } from 'react';
import { Button, Menu, MenuItem } from '@mui/material';
import { User } from '../../../types';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <Button color="inherit" onClick={handleClick}>
        Hello, {user.username}
      </Button>
      <Menu
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        keepMounted
      >
        <MenuItem>Profile</MenuItem>
        <MenuItem>My account</MenuItem>
        <MenuItem>Log out</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
