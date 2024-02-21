import React, { useEffect } from 'react';
import ArtistCard from '../components/ArtistCard';
import { CircularProgress, Container, Divider, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists, selectArtistsLoading } from '../artistsSlice';
import { fetchArtists } from '../artistsThunk';

const ArtistList: React.FC = () => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const isLoading = useAppSelector(selectArtistsLoading);
  
  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);
  
  return (
    <Container>
      <Typography variant="h1" color="seagreen">Popular artists</Typography>
      <Divider sx={{ borderColor: 'seagreen' }} />
      <Grid item container justifyContent="space-between" spacing={2} py={4} mt={4}>
        {isLoading && (<CircularProgress />)}
        {artists.length > 0 && artists.map(artist => (
          <Grid key={artist._id} item xs={4}>
            <ArtistCard artist={artist} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
};

export default ArtistList;