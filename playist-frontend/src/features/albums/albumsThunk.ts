import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchArtistAlbums = createAsyncThunk<Album[], string>(
  'albums/fetchArtistAlbums',
  async (artistId) => {
    const response = await axiosApi.get<Album[]>(routes.artistAlbums + artistId);
    return response.data ?? [];
  },
);