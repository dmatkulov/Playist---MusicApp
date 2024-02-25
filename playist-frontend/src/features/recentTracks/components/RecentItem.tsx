import React from 'react';
import { Divider, Grid, IconButton, Typography } from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { RecentTrack } from '../../../types';
import dayjs from 'dayjs';

interface Props {
  recent: RecentTrack;
}

const RecentItem: React.FC<Props> = ({ recent }) => {
  const date = dayjs(recent.datetime).format('DD/MM/YYYY');
  
  return (
    <>
      <Grid container alignItems="center" gap={3} py={2} pr={2}>
        <Grid item>
          <IconButton>
            <PlayCircleIcon sx={{ color: 'seagreen' }} />
          </IconButton>
        </Grid>
        <Grid item>
          <Typography variant="h6" fontWeight="bold">
            {recent.track?.title}
          </Typography>
        </Grid>
        <Grid item flexGrow={1}>
          <Typography variant="body1" color="gray">
            by {recent.artist?.name}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="body2">{date}</Typography>
        </Grid>
      </Grid>
      <Divider />
    </>
  );
};

export default RecentItem;
