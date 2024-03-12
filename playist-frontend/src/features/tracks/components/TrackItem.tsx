import React, { useCallback } from 'react';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { Track } from '../../../types';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { addToHistory } from '../../recentTracks/recentTracksThunks';
import {
  selectTrackDeleteLoading,
  selectTrackPublishLoading,
} from '../tracksSlice';
import CardMenu from '../../../components/MenuActions/CardMenu';
import { deleteTrack, fetchTracks, toggleTrack } from '../tracksThunks';

interface Props {
  track: Track;
}

const TrackItem: React.FC<Props> = ({ track }) => {
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectTrackPublishLoading);
  const deleteLoading = useAppSelector(selectTrackDeleteLoading);

  const addTrackToHistory = async () => {
    await dispatch(addToHistory(track._id));
  };

  const handlePublish = useCallback(async () => {
    await dispatch(toggleTrack(track._id));
    await dispatch(fetchTracks(track.album));
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteTrack(track._id));
    await dispatch(fetchTracks(track.album));
  }, [dispatch]);

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
          <CardMenu
            isPublished={track.isPublished}
            onDelete={handleDelete}
            onPublish={handlePublish}
            isPublishing={publishLoading}
            isDeleting={deleteLoading}
          />
        </Grid>
        <Grid item>
          <Typography variant="body2">{track.duration}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default TrackItem;
