import { createAsyncThunk } from '@reduxjs/toolkit';
import { TrackApi, TrackMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { isAxiosError } from 'axios';

export const fetchTracks = createAsyncThunk<TrackApi | null, string>(
  'tracks/fetchAll',
  async (albumId) => {
    const response = await axiosApi.get<TrackApi | null>(
      routes.tracksByAlbum + albumId,
    );

    return response.data ?? null;
  },
);

export const createTrack = createAsyncThunk<
  void,
  TrackMutation,
  { rejectValue: ValidationError }
>('tracks/create', async (trackMutation, { rejectWithValue }) => {
  try {
    await axiosApi.post(routes.tracks, trackMutation);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const toggleTrack = createAsyncThunk<void, string>(
  'tracks/publish',
  async (id) => {
    await axiosApi.patch(`${routes.tracks}/${id}/togglePublished`);
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteOne',
  async (id) => {
    await axiosApi.delete(`${routes.tracks}/${id}`);
  },
);
