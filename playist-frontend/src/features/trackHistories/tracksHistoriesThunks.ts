import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosApi from '../../axiosApi';
import { TrackHistory } from '../../types';
import { routes } from '../../constants';
import { RootState } from '../../app/store';

export const addToHistory = createAsyncThunk<void, string, { state: RootState }>(
  'tracksHistory/add',
  async (trackId, thunkApi) => {
    try {
      const state = thunkApi.getState();
      const token = state.users.user?.token;
      
      if (token) {
        const trackData: TrackHistory = {
          _id: trackId,
        };
        await axiosApi.post(routes.trackHistory, trackData, { headers: { 'Authorization': `Bearer ${token}` } });
      }
    } catch (e) {
      console.error(e);
    }
  },
);
