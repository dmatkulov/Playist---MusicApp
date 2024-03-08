import React, { useState } from 'react';
import { IconButton, Menu, MenuItem } from '@mui/material';
import PendingIcon from '@mui/icons-material/Pending';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';

interface Props {
  onPublish?: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
  isPublished?: boolean;
  isDeleting: boolean;
  isPublishing: boolean;
}

const MenuActions: React.FC<Props> = ({
  onPublish,
  onDelete,
  isPublished = true,
  isDeleting,
  isPublishing,
}) => {
  const user = useAppSelector(selectUser);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => setAnchorEl(null);

  return (
    <>
      <IconButton onClick={handleClick}>
        <PendingIcon />
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
        {user && user.role === 'admin' && !isPublished && (
          <MenuItem onClick={onPublish} disabled={isPublishing}>
            Publish
          </MenuItem>
        )}
        <MenuItem onClick={onDelete} disabled={isDeleting}>
          Delete
        </MenuItem>
      </Menu>
    </>
  );
};

export default MenuActions;
