import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchTracks = createAsyncThunk<Track | null, string>(
  'tracks/fetchAll',
  async (albumId) => {
    const response = await axiosApi.get<Track | null>(routes.tracks + albumId);

    return response.data ?? null;
  },
);
