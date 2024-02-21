import { createAsyncThunk } from '@reduxjs/toolkit';
import { Album } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchArtistAlbums = createAsyncThunk<Album | null, string>(
  'albums/fetchArtistAlbums',
  async (artistId) => {
    const response = await axiosApi.get<Album>(routes.artistAlbums + artistId);
    console.log(response.data);
    return response.data ?? null;
  },
);
