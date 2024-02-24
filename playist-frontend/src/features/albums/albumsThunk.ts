import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlbumMutation } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchAlbums = createAsyncThunk<AlbumMutation | null, string>(
  'albums/fetchAll',
  async (artistId) => {
    const response = await axiosApi.get<AlbumMutation | null>(
      routes.albums + artistId,
    );

    return response.data ?? null;
  },
);
