import { Route, Routes } from 'react-router-dom';
import ArtistList from './features/artists/containers/ArtistList';
import AlbumList from './features/albums/containers/AlbumList';
import TrackList from './features/tracks/containers/TrackList';
import Layout from './components/UI/Layout/Layout';
import Register from './features/users/containers/Register';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/" element={<ArtistList />} />
          <Route path="/register" element={<Register />} />
          <Route path="/albums/:artistId" element={<AlbumList />} />
          <Route path="/albums/tracks/:albumId" element={<TrackList />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
