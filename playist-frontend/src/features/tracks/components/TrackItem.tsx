import React from 'react';
import { Grid, IconButton, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { TrackMutation } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { addToHistory } from '../../recentTracks/recentTracksThunks';

interface Props {
  track: TrackMutation;
}

const TrackItem: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const addTrackToHistory = async () => {
    await dispatch(addToHistory(track._id));
  };

  return (
    <>
      <Grid container alignItems="center" gap={3} py={2} pr={2}>
        <Grid item>
          <IconButton onClick={addTrackToHistory}>
            <PlayCircleIcon sx={{ color: 'seagreen' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="body2" color="gray">
            {track.listing}
          </Typography>
        </Grid>
        <Grid item flexGrow={1}>
          <Typography variant="h6" fontWeight="bold">
            {track.title}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{track.duration}</Typography>
        </Grid>
      </Grid>
    </>
  );
};

export default TrackItem;
