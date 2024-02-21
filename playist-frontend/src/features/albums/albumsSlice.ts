import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';
import { fetchArtistAlbums } from './albumsThunk';

interface AlbumsState {
  items: Album | null;
  fetchLoading: boolean;
}

const initialState: AlbumsState = {
  items: null,
  fetchLoading: false,
};

export const albumsSlice = createSlice({
  name: 'albums',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchArtistAlbums.pending, (state) => {
        state.fetchLoading = true;
      })
      .addCase(fetchArtistAlbums.fulfilled, (state, { payload: albums }) => {
        state.fetchLoading = false;
        state.items = albums;
      })
      .addCase(fetchArtistAlbums.rejected, (state) => {
        state.fetchLoading = false;
      });
  },
});

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) =>
  state.albums.fetchLoading;
