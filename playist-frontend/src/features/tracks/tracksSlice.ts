import { Track } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchTracks } from './tracksThunks';

interface TracksState {
  items: Track | null;
  fetchLoading: boolean;
}

const initialState: TracksState = {
  items: null,
  fetchLoading: false,
};

export const tracksSlice = createSlice({
  name: 'tracks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTracks.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchTracks.fulfilled, (state, { payload: tracks }) => {
        state.fetchLoading = false;
        state.items = tracks;
      })
      .addCase(fetchTracks.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchLoading;
