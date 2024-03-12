import React, { useEffect } from 'react';
import RecentItem from '../components/RecentItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectRecentLoading, selectRecentTracks } from '../recentTracksSlice';
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';
import { Divider, Stack, Typography } from '@mui/material';
import { motion } from 'framer-motion';
import { fetchRecent } from '../recentTracksThunks';

const RecentList: React.FC = () => {
  const dispatch = useAppDispatch();
  const recentTracks = useAppSelector(selectRecentTracks);
  const isLoading = useAppSelector(selectRecentLoading);

  const listVariants = {
    visible: (i: number) => ({
      opacity: 1,
      transition: {
        delay: i * 0.1,
        ease: 'easeIn',
      },
      y: 0,
    }),
    hidden: {
      opacity: 0,
      y: 10,
    },
  };

  useEffect(() => {
    dispatch(fetchRecent());
  }, [dispatch]);

  return (
    <div>
      {isLoading && <LoadingPage />}
      <Stack direction="column" spacing={3} width="100%" mb={5}>
        <Typography variant="h4">Recent</Typography>
        <Divider />
      </Stack>
      {recentTracks.length > 0 ? (
        recentTracks.map((recent, i) => (
          <motion.div
            key={recent._id}
            variants={listVariants}
            initial={'hidden'}
            animate={'visible'}
            custom={i}
          >
            <RecentItem recent={recent} />
          </motion.div>
        ))
      ) : (
        <Typography variant="subtitle1" textAlign="center" sx={{ flexGrow: 1 }}>
          Tracks history not available
        </Typography>
      )}
    </div>
  );
};

export default RecentList;
