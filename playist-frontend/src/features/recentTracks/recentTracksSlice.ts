import { RecentTrack } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchRecent } from './recentTracksThunks';

interface TrackHistoriesState {
  items: RecentTrack[];
  fetchLoading: boolean;
}

const initialState: TrackHistoriesState = {
  items: [],
  fetchLoading: false,
};

export const recentTracksSlice = createSlice({
  name: 'recentTracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchRecent.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchRecent.fulfilled, (state, { payload: recent }) => {
        state.fetchLoading = false;
        state.items = recent;
      })
      .addCase(fetchRecent.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const recentTracksReducer = recentTracksSlice.reducer;

export const selectRecentTracks = (state: RootState) => state.recent.items;
export const selectRecentLoading = (state: RootState) =>
  state.recent.fetchLoading;
