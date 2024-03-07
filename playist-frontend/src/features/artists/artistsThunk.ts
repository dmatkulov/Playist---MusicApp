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

export const publishArtist = createAsyncThunk<void, string>(
  'artists/publish',
  async (id) => {
    await axiosApi.patch(`${routes.artists}/${id}/togglePublished`);
  },
);

export const deleteArtist = createAsyncThunk<void, string>(
  'artists/deleteOne',
  async (id) => {
    await axiosApi.delete(`${routes.artists}/${id}`);
  },
);
