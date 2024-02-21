import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchAlbums = createAsyncThunk<Album | null, string>(
  'albums/fetchAll',
  async (artistId) => {
    const response = await axiosApi.get<Album | null>(routes.albums + artistId);

    return response.data ?? null;
  },
);
