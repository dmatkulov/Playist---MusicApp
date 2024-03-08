import React, { useEffect, useState } from 'react';
import { AlbumMutation } from '../../../types';
import { Box, Grid, MenuItem, TextField } from '@mui/material';
import FileInput from '../../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectAlbumCreateError,
  selectAlbumCreateLoading,
} from '../albumsSlice';
import { selectArtists } from '../../artists/artistsSlice';
import { fetchArtists } from '../../artists/artistsThunk';

interface Props {
  onSubmit: (state: AlbumMutation) => void;
}

const AlbumForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const error = useAppSelector(selectAlbumCreateError);
  const creating = useAppSelector(selectAlbumCreateLoading);

  const [state, setState] = useState<AlbumMutation>({
    artist: '',
    title: '',
    yearOfRelease: '',
    cover: null,
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, files } = event.target;
    if (files) {
      setState((prevState) => ({
        ...prevState,
        [name]: files[0],
      }));
    }
  };

  const getFieldError = (fieldName: string) => {
    try {
      return error?.errors[fieldName].message;
    } catch {
      return undefined;
    }
  };

  const onSubmitArtist = async (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(state);
  };

  return (
    <>
      <Box component="form" onSubmit={onSubmitArtist}>
        <Grid container item xs={6} direction="column" spacing={2} mx="auto">
          <Grid item xs>
            <TextField
              select
              fullWidth
              label="Artist"
              name="artist"
              type="text"
              value={state.artist}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('artist'))}
              helperText={getFieldError('artist')}
            >
              <MenuItem value="" disabled>
                Please select a category
              </MenuItem>
              {artists.map((artist) => (
                <MenuItem key={artist._id} value={artist._id}>
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Title"
              name="title"
              value={state.title}
              type="text"
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('title'))}
              helperText={getFieldError('title')}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Year of release"
              name="yearOfRelease"
              value={state.yearOfRelease}
              type="text"
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('yearOfRelease'))}
              helperText={getFieldError('yearOfRelease')}
            />
          </Grid>
          <Grid item xs={6}>
            <FileInput
              name="cover"
              label="Cover"
              onChange={fileInputChangeHandler}
            />
          </Grid>

          <Grid item xs={3} textAlign="right">
            <LoadingButton
              type="submit"
              loading={creating}
              disableElevation
              sx={{ mt: 3, mb: 2, py: 1 }}
              disabled={creating}
              variant="contained"
            >
              Create Album
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default AlbumForm;
