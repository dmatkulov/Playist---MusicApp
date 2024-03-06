import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { RootState } from '../../app/store';

export const fetchArtists = createAsyncThunk<Artist[], undefined, { state: RootState }>(
  'artists/fetchAll',
  async (_, { getState }) => {
    const user = getState().users.user;
    let url = routes.artists;
    
    if (user) {
      const userId = user._id;
      url = url + '?userId=' + userId;
    }
    
    const response = await axiosApi.get<Artist[]>(url);
    return response.data ?? [];
    
  },
);
