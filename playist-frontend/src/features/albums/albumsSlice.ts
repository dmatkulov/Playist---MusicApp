import { AlbumApi, ValidationError } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import {
  createAlbum,
  deleteAlbum,
  fetchAlbums,
  toggleAlbum,
} from './albumsThunk';

interface AlbumsState {
  items: AlbumApi | null;
  fetchLoading: boolean;
  publishLoading: boolean;
  deleteLoading: boolean;
  createLoading: boolean;
  createError: ValidationError | null;
}

const initialState: AlbumsState = {
  items: null,
  fetchLoading: false,
  publishLoading: false,
  deleteLoading: false,
  createLoading: false,
  createError: null,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchAlbums.fulfilled, (state, { payload: albums }) => {
        state.fetchLoading = false;
        state.items = albums;
      })
      .addCase(fetchAlbums.rejected, (state) => {
        state.fetchLoading = false;
      });

    builder
      .addCase(toggleAlbum.pending, (state) => {
        state.publishLoading = true;
      })
      .addCase(toggleAlbum.fulfilled, (state) => {
        state.publishLoading = false;
      })
      .addCase(toggleAlbum.rejected, (state) => {
        state.publishLoading = false;
      });

    builder
      .addCase(deleteAlbum.pending, (state) => {
        state.deleteLoading = true;
      })
      .addCase(deleteAlbum.fulfilled, (state) => {
        state.deleteLoading = false;
      })
      .addCase(deleteAlbum.rejected, (state) => {
        state.deleteLoading = false;
      });

    builder
      .addCase(createAlbum.pending, (state) => {
        state.createError = null;
        state.createLoading = true;
      })
      .addCase(createAlbum.fulfilled, (state) => {
        state.createLoading = false;
      })
      .addCase(createAlbum.rejected, (state, { payload: error }) => {
        state.createError = error || null;
        state.createLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) =>
  state.albums.fetchLoading;

export const selectAlbumPublishLoading = (state: RootState) =>
  state.artists.publishLoading;
export const selectAlbumDeleteLoading = (state: RootState) =>
  state.artists.deleteLoading;
export const selectAlbumCreateLoading = (state: RootState) =>
  state.artists.createLoading;
export const selectAlbumCreateError = (state: RootState) =>
  state.artists.createError;
