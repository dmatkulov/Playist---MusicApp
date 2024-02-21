import { Container } from '@mui/material';
import { Route, Routes } from 'react-router-dom';
import ArtistList from './features/artists/containers/ArtistList';
import AppToolbar from './components/UI/AppToolbar/AppToolbar';
import AlbumList from './features/albums/containers/AlbumList';
import TrackList from './features/tracks/containers/TrackList';

function App() {
  return (
    <>
      <Container maxWidth="lg">
        <header>
          <AppToolbar />
        </header>
        <Routes>
          <Route path="/" element={<ArtistList />} />
          <Route path="/albums/:artistId" element={<AlbumList />} />
          <Route path="/albums/tracks/:albumId" element={<TrackList />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Container>
    </>
  );
}

export default App;
