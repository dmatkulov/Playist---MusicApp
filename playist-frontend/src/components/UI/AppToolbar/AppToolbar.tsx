import { NavLink } from 'react-router-dom';
import { AppBar, styled, Toolbar, Typography } from '@mui/material';

const Link = styled(NavLink)({
  color: 'inherit',
  textDecoration: 'none',
  '&:hover': {
    color: 'inherit',
  },
});

const AppToolbar = () => {
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
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          <Link to="/">Home</Link>
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default AppToolbar;
