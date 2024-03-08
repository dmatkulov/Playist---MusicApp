import { Artist, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createArtist,
  deleteArtist,
  fetchArtists,
  toggleArtist,
} from './artistsThunk';

interface ArtistsState {
  items: Artist[];
  fetchLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: ArtistsState = {
  items: [],
  fetchLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
  createError: null,
};

export const artistsSlice = createSlice({
  name: 'artists',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtists.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtists.fulfilled, (state, { payload: artists }) => {
        state.fetchLoading = false;
        state.items = artists;
      })
      .addCase(fetchArtists.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(toggleArtist.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(toggleArtist.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(toggleArtist.rejected, (state) => {
        state.publishLoading = false;
      });

    builder
      .addCase(deleteArtist.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteArtist.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteArtist.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(createArtist.pending, (state) => {
        state.createError = null;
        state.createLoading = true;
      })
      .addCase(createArtist.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createArtist.rejected, (state, { payload: error }) => {
        state.createError = error || null;
        state.createLoading = false;
      });
  },
});

export const artistsReducer = artistsSlice.reducer;

export const selectArtists = (state: RootState) => state.artists.items;
export const selectArtistsLoading = (state: RootState) =>
  state.artists.fetchLoading;

export const selectArtistPublishLoading = (state: RootState) =>
  state.artists.publishLoading;
export const selectArtistDeleteLoading = (state: RootState) =>
  state.artists.deleteLoading;
export const selectArtistCreateLoading = (state: RootState) =>
  state.artists.createLoading;
export const selectArtistCreateError = (state: RootState) =>
  state.artists.createError;
