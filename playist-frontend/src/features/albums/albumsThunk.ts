import { createAsyncThunk } from '@reduxjs/toolkit';
import { AlbumApi, AlbumMutation, ValidationError } from '../../types';
import axiosApi from '../../axiosApi';
import { routes } from '../../constants';
import { isAxiosError } from 'axios';

export const fetchAlbums = createAsyncThunk<AlbumApi, string>(
  'albums/fetchAll',
  async (artistId) => {
    const response = await axiosApi.get<AlbumApi>(
      routes.albumsByArtist + artistId,
    );

    return response.data ?? null;
  },
);

export const createAlbum = createAsyncThunk<
  void,
  AlbumMutation,
  { rejectValue: ValidationError }
>('artists/create', async (albumMutation, { rejectWithValue }) => {
  try {
    const formData = new FormData();

    formData.append('artist', albumMutation.artist);
    formData.append('title', albumMutation.title);
    formData.append('yearOfRelease', albumMutation.yearOfRelease);

    if (albumMutation.cover) {
      formData.append('cover', albumMutation.cover);
    }

    await axiosApi.post(routes.albums, formData);
  } catch (e) {
    if (isAxiosError(e) && e.response && e.response.status === 422) {
      return rejectWithValue(e.response.data);
    }

    throw e;
  }
});

export const toggleAlbum = createAsyncThunk<void, string>(
  'albums/publish',
  async (id) => {
    await axiosApi.patch(`${routes.albums}/${id}/togglePublished`);
  },
);

export const deleteAlbum = createAsyncThunk<void, string>(
  'albums/deleteOne',
  async (id) => {
    await axiosApi.delete(`${routes.albums}/${id}`);
  },
);
