import React from 'react';
import AppToolbar from '../AppToolbar/AppToolbar';
import { Container } from '@mui/material';

const Layout: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Container maxWidth="lg">
      <header>
        <AppToolbar />
      </header>
      <main>
        {children}
      </main>
    </Container>
  );
};

export default Layout;