import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlbumMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchAlbums = createAsyncThunk<AlbumMutation, string>(
  'albums/fetchAll',
  async (artistId) => {
    const response = await axiosApi.get<AlbumMutation>(
      routes.albumsByArtist + artistId,
    );
    
    return response.data ?? null;
  },
);

export const publishAlbum = createAsyncThunk<void, string>(
  'albums/publish',
  async (id) => {
    await axiosApi.patch(`${routes.albums}/${id}/togglePublished`);
  },
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteOne',
  async (id) => {
    await axiosApi.delete(`${routes.albums}/${id}`);
  },
);
