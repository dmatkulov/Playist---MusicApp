import React, { useEffect } from 'react';
import TrackItem from '../components/TrackItem';
import { CircularProgress, Divider, Grid, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectTracks, selectTracksLoading } from '../tracksSlice';
import { useParams } from 'react-router-dom';
import { fetchTracks } from '../tracksThunks';

const TrackList: React.FC = () => {
  const dispatch = useAppDispatch();
  const tracks = useAppSelector(selectTracks);
  const isLoading = useAppSelector(selectTracksLoading);
  const { albumId } = useParams() as { albumId: string };
  
  useEffect(() => {
    dispatch(fetchTracks(albumId));
  }, [dispatch]);
  
  return tracks && (
    <Grid container spacing={4} justifyContent="space-between" mt={3}>
      {isLoading && <CircularProgress />}
      
      <Grid item xs={3} direction="column">
        <Typography variant="h5" gutterBottom>{tracks.artist.name}</Typography>
        <Divider sx={{ my: 2 }} />
        <Typography variant="subtitle1">{tracks.album.title}</Typography>
      </Grid>
      
      <Grid item xs={8} container spacing={2} py={4} mt={4} px={2}
            sx={{ backgroundColor: 'rgba(166,166,166,0.06)', borderRadius: 3 }}>
        <TrackItem />
      </Grid>
    </Grid>
  );
};

export default TrackList;