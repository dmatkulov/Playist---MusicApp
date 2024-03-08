import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RecentTrack, RecentTrackApi } from '../../types';
import { routes } from '../../constants';

export const fetchRecent = createAsyncThunk<
  RecentTrack[],
  void
>('recentTracks/fetchAll', async () => {
  try {
    const response = await axiosApi.get<RecentTrack[]>(routes.trackHistory);
    return response.data;
  } catch (e) {
    console.error(e);
    throw e;
  }
});
export const addToHistory = createAsyncThunk<
  void,
  string
>('recentTracks/add', async (trackId) => {
  try {
    const trackData: RecentTrackApi = {
      _id: trackId,
    };
    await axiosApi.post(routes.trackHistory, trackData);
    
  } catch (e) {
    console.error(e);
  }
});
