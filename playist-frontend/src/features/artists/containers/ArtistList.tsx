import React, { useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';
import { Container, Divider, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists, selectArtistsLoading } from '../artistsSlice';
import { fetchArtists } from '../artistsThunk';
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';

const ArtistList: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectArtistsLoading);
  
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  
  return (
    <Container>
      <Typography variant="h1" component="h2" color="seagreen">
        Timeless Classics
      </Typography>
      <Divider sx={{ borderColor: 'seagreen' }} />
      <Grid
        item
        container
        justifyContent="space-between"
        spacing={2}
        py={4}
        mt={4}
      >
        {isLoading && <LoadingPage />}
        {artists.map((artist) => (
          <Grid key={artist._id} item xs={4}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArtistList;
