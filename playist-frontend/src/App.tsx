import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import ArtistList from './features/artists/containers/ArtistList';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';

function App() {
  return (
    <>
      Main app
      <header>
        <AppToolbar />
      </header>
      <Container maxWidth="md">
        <Routes>
          <Route path="/" element={<ArtistList />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
