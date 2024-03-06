import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import RegisterUser from './features/users/containers/RegisterUser';
import LoginUser from './features/users/containers/LoginUser';
import ArtistList from './features/artists/containers/ArtistList';

function App() {
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/" element={<ArtistList />} />
          {/*<Route path="/albums/:artistId" element={<AlbumList />} />*/}
          {/*<Route path="/albums/tracks/:albumId" element={<TrackList />} />*/}
          {/*<Route path="/trackshistory" element={<RecentList />} />*/}
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
