import React, { useState } from 'react';
import {
  Button,
  IconButton,
  Menu,
  MenuItem,
  Stack,
  Typography,
} from '@mui/material';
import { User } from '../../../types';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import LogoutIcon from '@mui/icons-material/Logout';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { logOut } from '../../../features/users/usersThunks';
import { selectLogOutLoading } from '../../../features/users/usersSlice';
import LoadingPage from '../LoadingPage/LoadingPage';
import { fetchArtists } from '../../../features/artists/artistsThunk';
import RestoreIcon from '@mui/icons-material/Restore';

interface Props {
  user: User;
}

const UserMenu: React.FC<Props> = ({ user }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const loading = useAppSelector(selectLogOutLoading);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [publishEl, setPublishEl] = useState<HTMLElement | null>(null);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handlePublishItem = (event: React.MouseEvent<HTMLElement>) => {
    setPublishEl(event.currentTarget);
  };
  const handleClose = () => setAnchorEl(null);
  const handlePublishClose = () => setPublishEl(null);

  const handleLogOut = async () => {
    await dispatch(logOut());
    await dispatch(fetchArtists());
    navigate('/');
  };

  return (
    <>
      {loading && <LoadingPage />}
      <Stack
        sx={{ flexGrow: 1 }}
        direction="row"
        spacing={5}
        alignItems="center"
        justifyContent="center"
      ></Stack>
      <Stack direction="row" alignItems="center" spacing={4}>
        <Button
          variant="contained"
          color="secondary"
          disableElevation
          onClick={handlePublishItem}
          endIcon={<KeyboardArrowDownIcon />}
          size="small"
          sx={{ borderRadius: 5, px: 2 }}
        >
          Create
        </Button>
        <Stack direction="row" alignItems="center">
          <Typography>{user.username}</Typography>
          <IconButton
            onClick={handleClick}
            sx={{ display: 'flex', gap: 1 }}
            disableRipple
          >
            <AccountCircleIcon />
          </IconButton>
        </Stack>
      </Stack>
      <Menu
        open={Boolean(publishEl)}
        anchorEl={publishEl}
        onClose={handlePublishClose}
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
        <MenuItem onClick={() => navigate('/artist/new')}>New Artist</MenuItem>
        <MenuItem onClick={() => navigate('/album/new')}>New Album</MenuItem>
        <MenuItem onClick={() => navigate('/track/new')}>New Track</MenuItem>
      </Menu>

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
        <MenuItem onClick={() => navigate('/trackshistory')}>
          <RestoreIcon sx={{ mr: 2 }} />
          Recently played
        </MenuItem>
        <MenuItem onClick={handleLogOut}>
          <LogoutIcon sx={{ mr: 2 }} />
          Log out
        </MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;
