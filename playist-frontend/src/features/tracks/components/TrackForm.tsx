import React, { useEffect, useState } from 'react';
import { Box, Grid, MenuItem, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectArtists } from '../../artists/artistsSlice';
import { selectAlbums } from '../../albums/albumsSlice';
import { TrackMutation } from '../../../types';
import { fetchArtists } from '../../artists/artistsThunk';
import {
  selectTrackCreateError,
  selectTrackCreateLoading,
} from '../tracksSlice';
import { fetchAlbums } from '../../albums/albumsThunk';

interface Props {
  onSubmit: (state: TrackMutation) => void;
}

const TrackForm: React.FC<Props> = ({ onSubmit }) => {
  const dispatch = useAppDispatch();
  const artists = useAppSelector(selectArtists);
  const albums = useAppSelector(selectAlbums);
  const error = useAppSelector(selectTrackCreateError);
  const creating = useAppSelector(selectTrackCreateLoading);

  const [state, setState] = useState<TrackMutation>({
    album: '',
    title: '',
    duration: '',
    listing: '',
  });

  const [artist, setArtist] = useState({
    name: '',
  });

  useEffect(() => {
    dispatch(fetchArtists());
  }, [dispatch]);

  const fetchAlbumsByArtist = async (artistId: string) => {
    await dispatch(fetchAlbums(artistId));
  };

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const artistChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setArtist((prevState) => {
      return { ...prevState, [name]: value };
    });
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
              required
              label="Artist"
              name="name"
              type="text"
              value={artist.name}
              onChange={artistChangeHandler}
            >
              <MenuItem value="" disabled>
                Please select a category
              </MenuItem>
              {artists.map((artist) => (
                <MenuItem
                  key={artist._id}
                  value={artist._id}
                  onClick={() => fetchAlbumsByArtist(artist._id)}
                >
                  {artist.name}
                </MenuItem>
              ))}
            </TextField>
          </Grid>

          <Grid item xs>
            <TextField
              select
              required
              fullWidth
              label="Album"
              name="album"
              type="text"
              value={state.album}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('album'))}
              helperText={getFieldError('album')}
            >
              <MenuItem value="" disabled>
                Please select an album
              </MenuItem>
              {albums &&
                albums.albums &&
                albums.albums.map((album) => (
                  <MenuItem key={album._id} value={album._id}>
                    {album.title}
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
              label="Duration (mm:ss)"
              name="duration"
              type="text"
              placeholder="mm:ss"
              value={state.duration}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('duration'))}
              helperText={getFieldError('duration')}
            />
          </Grid>

          <Grid item>
            <TextField
              fullWidth
              label="Queue in album"
              name="listing"
              value={state.listing}
              type="number"
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('listing'))}
              helperText={getFieldError('listing')}
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
              Create Track
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default TrackForm;
