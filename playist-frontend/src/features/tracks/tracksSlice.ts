import { TrackApi, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createTrack,
  deleteTrack,
  fetchTracks,
  toggleTrack,
} from './tracksThunks';

interface TracksState {
  items: TrackApi | null;
  fetchLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: TracksState = {
  items: null,
  fetchLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
  createError: null,
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

    builder
      .addCase(toggleTrack.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(toggleTrack.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(toggleTrack.rejected, (state) => {
        state.publishLoading = false;
      });

    builder
      .addCase(deleteTrack.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteTrack.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteTrack.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(createTrack.pending, (state) => {
        state.createError = null;
        state.createLoading = true;
      })
      .addCase(createTrack.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createTrack.rejected, (state, { payload: error }) => {
        state.createError = error || null;
        state.createLoading = false;
      });
  },
});

export const tracksReducer = tracksSlice.reducer;
export const selectTracks = (state: RootState) => state.tracks.items;
export const selectTracksLoading = (state: RootState) =>
  state.tracks.fetchLoading;

export const selectTrackPublishLoading = (state: RootState) =>
  state.tracks.publishLoading;
export const selectTrackDeleteLoading = (state: RootState) =>
  state.tracks.deleteLoading;
export const selectTrackCreateLoading = (state: RootState) =>
  state.tracks.createLoading;
export const selectTrackCreateError = (state: RootState) =>
  state.tracks.createError;
