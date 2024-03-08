import { createAsyncThunk } from '@reduxjs/toolkit';
import { Artist, ArtistMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { isAxiosError } from 'axios';

export const fetchArtists = createAsyncThunk<Artist[]>(
  'artists/fetchAll',
  async () => {
    const response = await axiosApi.get<Artist[]>(routes.artists);
    return response.data ?? [];
  },
);

export const createArtist = createAsyncThunk<
  void,
  ArtistMutation,
  { rejectValue: ValidationError }
>('artists/create', async (artistMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('name', artistMutation.name);
    formData.append('about', artistMutation.about);

    if (artistMutation.cover) {
      formData.append('cover', artistMutation.cover);
    }

    await axiosApi.post(routes.artists, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const toggleArtist = createAsyncThunk<void, string>(
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
