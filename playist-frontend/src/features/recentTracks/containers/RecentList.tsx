import React, { useEffect } from 'react';
import RecentItem from '../components/RecentItem';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectRecentLoading, selectRecentTracks } from '../recentTracksSlice';
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';
import { fetchRecent } from '../recentTracksThunks';
import { Divider, Stack, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { selectUser } from '../../users/usersSlice';

const RecentList: React.FC = () => {
  const navigate = useNavigate();
  const user = useAppSelector(selectUser);
  const dispatch = useAppDispatch();
  const recentTracks = useAppSelector(selectRecentTracks);
  const isLoading = useAppSelector(selectRecentLoading);
  
  
  useEffect(() => {
    if (!user) {
      navigate('/');
    }
    
    dispatch(fetchRecent());
  }, [dispatch]);
  
  return (
    <div>
      {isLoading && <LoadingPage />}
      <Stack direction="column" spacing={3} width="100%" mb={5}>
        <Typography variant="h4">Recent</Typography>
        <Divider />
      </Stack>
      {recentTracks.map((recent) => (
        <RecentItem key={recent._id} recent={recent} />
      ))}
    </div>
  );
};

export default RecentList;
