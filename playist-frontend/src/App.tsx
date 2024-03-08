import { Route, Routes } from 'react-router-dom';
import Layout from './components/UI/Layout/Layout';
import RegisterUser from './features/users/containers/RegisterUser';
import LoginUser from './features/users/containers/LoginUser';
import ArtistList from './features/artists/containers/ArtistList';
import AlbumList from './features/albums/containers/AlbumList';
import TrackList from './features/tracks/containers/TrackList';
import RecentList from './features/recentTracks/containers/RecentList';
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute';
import NewArtist from './features/artists/containers/NewArtist';
import { useAppSelector } from './app/hooks';
import { selectUser } from './features/users/usersSlice';
import NewAlbum from './features/albums/containers/NewAlbum';
import NewTrack from './features/tracks/containers/NewTrack';

function App() {
  const user = useAppSelector(selectUser);
  
  return (
    <>
      <Layout>
        <Routes>
          <Route path="/register" element={<RegisterUser />} />
          <Route path="/login" element={<LoginUser />} />
          <Route path="/" element={<ArtistList />} />
          <Route
            path="/artist/new"
            element={
              <ProtectedRoute
                isAllowed={
                  user && (user.role === 'admin' || user.role === 'user')
                }
              >
                <NewArtist />
              </ProtectedRoute>
            }
          />
          <Route
            path="/album/new"
            element={
              <ProtectedRoute
                isAllowed={
                  user && (user.role === 'admin' || user.role === 'user')
                }
              >
                <NewAlbum />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/track/new"
            element={
              <ProtectedRoute
                isAllowed={
                  user && (user.role === 'admin' || user.role === 'user')
                }
              >
                <NewTrack />
              </ProtectedRoute>
            }
          />
          
          <Route
            path="/trackshistory"
            element={
              <ProtectedRoute
                isAllowed={
                  user && (user.role === 'admin' || user.role === 'user')
                }
              >
                <RecentList />
              </ProtectedRoute>
            }
          />
          
          <Route path="/albums/:artistId" element={<AlbumList />} />
          <Route path="/albums/tracks/:albumId" element={<TrackList />} />
          <Route path="*" element={<h2>Not found!</h2>} />
        </Routes>
      </Layout>
    </>
  );
}

export default App;
