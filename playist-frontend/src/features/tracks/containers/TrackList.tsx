import React, { useEffect } from 'react';
import TrackItem from '../components/TrackItem';
import { Container, Divider, Grid, Link, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTracks, selectTracksLoading } from '../tracksSlice';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../tracksThunks';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { apiURL } from '../../../constants';
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';

const TrackList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectTracksLoading);
  const { albumId } = useParams() as { albumId: string };

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch]);

  let cardImage = noCoverImage;
  if (tracks) {
    cardImage = apiURL + '/' + tracks.album.cover;
  }

  return (
    <Container>
      {isLoading && <LoadingPage />}

      {tracks && (
        <Grid container spacing={4} justifyContent="space-between" mt={3}>
          <Grid item xs={3}>
            <Link
              href={`/albums/${tracks.artist._id}`}
              underline="none"
              sx={{ display: 'flex', gap: 1 }}
            >
              <ArrowBackIcon />
              Back to albums
            </Link>
            <Typography variant="h5" gutterBottom>
              {tracks.album.title}
            </Typography>
            <Typography variant="subtitle1" color="darkgray">
              by {tracks.artist.name}
            </Typography>
            <Divider sx={{ my: 4 }} />
            <div>
              <img
                src={cardImage}
                alt={tracks.album.title}
                loading="lazy"
                width="100%"
              />
            </div>
          </Grid>

          <Grid
            item
            xs={8}
            container
            spacing={2}
            py={4}
            mt={4}
            px={2}
            sx={{ backgroundColor: 'rgba(166,166,166,0.06)', borderRadius: 3 }}
          >
            {tracks.tracks.map((track) => (
              <TrackItem track={track} key={track._id} />
            ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default TrackList;
