import { NavLink } from 'react-router-dom';
import { AppBar, Grid, Stack, styled, Toolbar, Typography } from '@mui/material';
import MusicNoteIcon from '@mui/icons-material/MusicNote';
import { useAppSelector } from '../../../app/hooks';
import { selectUser } from '../../../features/users/usersSlice';
import UserMenu from './UserMenu';
import GuestMenu from './GuestMenu';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
  const user = useAppSelector(selectUser);
  
  return (
    <AppBar
      position="sticky"
      sx={{
        borderRadius: 6,
        backgroundColor: 'none',
        boxShadow: 0,
        textAlign: 'center',
        mt: 2,
        mb: 4,
      }}
    >
      <Toolbar>
        <Grid container justifyContent="space-between" alignItems="center">
          <Stack direction="row" spacing={1} alignItems="center">
            <MusicNoteIcon />
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              <Link to="/">Playist</Link>
            </Typography>
          </Stack>
          {user ? <UserMenu user={user} /> : <GuestMenu />}
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
