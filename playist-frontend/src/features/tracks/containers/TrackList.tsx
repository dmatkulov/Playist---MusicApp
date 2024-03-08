import React, { useEffect } from 'react';
import TrackItem from '../components/TrackItem';
import { Box, Container, Divider, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTracks, selectTracksLoading } from '../tracksSlice';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../tracksThunks';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { apiURL } from '../../../constants';
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';
import BackLink from '../../../components/MenuActions/BackLink';

const TrackList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectTracksLoading);
  const { albumId } = useParams() as { albumId: string };

  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch]);

  let cardImage = noCoverImage;
  if (tracks?.album.cover) {
    cardImage = `${apiURL}/${tracks.album.cover}`;
  }

  return (
    <Container>
      {isLoading && <LoadingPage />}

      {tracks && (
        <Grid container spacing={4} justifyContent="space-between" mt={3}>
          <Grid item xs={3}>
            <BackLink location="albums" />
            <Typography variant="h5" gutterBottom mt={2}>
              {tracks.album.title} ({tracks.album.yearOfRelease})
            </Typography>
            <Typography variant="subtitle1" color="darkgray">
              by {tracks.album.artist.name}
            </Typography>
            <Divider sx={{ my: 4 }} />
            <Box
              sx={{ height: '300px', overflow: 'hidden', borderRadius: '12px' }}
            >
              <img
                src={cardImage}
                alt={tracks.album.title}
                loading="lazy"
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                }}
              />
            </Box>
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
            {tracks.tracks.length > 0 ? (
              tracks.tracks.map((track) => (
                <TrackItem track={track} key={track._id} />
              ))
            ) : (
              <Typography
                variant="subtitle1"
                textAlign="center"
                sx={{ flexGrow: 1 }}
              >
                Track for this album not found
              </Typography>
            )}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default TrackList;
