import { createAsyncThunk } from '@reduxjs/toolkit';
import { Track } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';

export const fetchTracks = createAsyncThunk<Track | null, string>(
  'tracks/fetchAll',
  async (albumId) => {
    const response = await axiosApi.get<Track | null>(routes.tracksByAlbum + albumId);
    
    return response.data ?? null;
  },
);

export const publishTrack = createAsyncThunk<void, string>(
  'tracks/publish',
  async (id) => {
    await axiosApi.patch(`${routes.tracksByAlbum}/${id}/togglePublished`);
  },
);

export const deleteTrack = createAsyncThunk<void, string>(
  'tracks/deleteOne',
  async (id) => {
    await axiosApi.delete(`${routes.tracks}/${id}`);
  },
);
