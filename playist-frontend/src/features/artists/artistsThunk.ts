import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<Artist[]>(routes.artists);
    
    return response.data ?? [];
  },
);