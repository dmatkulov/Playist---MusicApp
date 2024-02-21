import { Album } from '../../types';
import { createSlice } from '@reduxjs/toolkit';
import { RootState } from '../../app/store';

interface AlbumsState {
  items: Album[];
  fetchLoading: boolean;
}

const initialState: AlbumsState = {
  items: [],
  fetchLoading: false,
};

export const albumsSlice = createSlice(({
  name: 'albums',
  initialState,
  reducers: {},
}));

export const albumsReducer = albumsSlice.reducer;
export const selectAlbums = (state: RootState) => state.albums.items;
export const selectAlbumsLoading = (state: RootState) => state.albums.fetchLoading;