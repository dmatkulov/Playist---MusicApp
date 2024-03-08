import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { RecentTrack, RecentTrackApi } from '../../types';
import { routes } from '../../constants';
import { RootState } from '../../app/store';

export const fetchRecent = createAsyncThunk<
  RecentTrack[],
  void,
  { state: RootState }
>('recentTracks/fetchAll', async (_, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;
    let recentTracks: RecentTrack[] = [];

    if (token) {
      const response = await axiosApi.get<RecentTrack[]>(routes.trackHistory, {
        headers: { Authorization: `Bearer ${token}` },
      });
      recentTracks = response.data;
    }

    return recentTracks;
  } catch (e) {
    console.error(e);
    throw e;
  }
});
export const addToHistory = createAsyncThunk<
  void,
  string,
  { state: RootState }
>('recentTracks/add', async (trackId, thunkApi) => {
  try {
    const state = thunkApi.getState();
    const token = state.users.user?.token;

    if (token) {
      const trackData: RecentTrackApi = {
        _id: trackId,
      };
      await axiosApi.post(routes.trackHistory, trackData, {
        headers: { Authorization: `Bearer ${token}` },
      });
    }
  } catch (e) {
    console.error(e);
  }
});
