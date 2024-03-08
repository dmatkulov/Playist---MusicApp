import { Box, Grid, TextField } from '@mui/material';
import React, { useState } from 'react';
import FileInput from '../../../components/FileInput/FileInput';
import { LoadingButton } from '@mui/lab';
import { ArtistMutation } from '../../../types';
import { useAppSelector } from '../../../app/hooks';
import {
  selectArtistCreateError,
  selectArtistCreateLoading,
} from '../artistsSlice';

interface Props {
  onSubmit: (state: ArtistMutation) => void;
}

const ArtistForm: React.FC<Props> = ({ onSubmit }) => {
  const error = useAppSelector(selectArtistCreateError);
  const creating = useAppSelector(selectArtistCreateLoading);

  const [state, setState] = useState<ArtistMutation>({
    name: '',
    about: '',
    cover: null,
  });

  const inputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  const fileInputChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
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
              fullWidth
              label="Name"
              name="name"
              type="text"
              value={state.name}
              onChange={inputChangeHandler}
              error={Boolean(getFieldError('name'))}
              helperText={getFieldError('name')}
            />
          </Grid>
          <Grid item>
            <TextField
              fullWidth
              label="Desccription"
              name="about"
              multiline
              rows={4}
              value={state.about}
              onChange={inputChangeHandler}
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
              Create Artist
            </LoadingButton>
          </Grid>
        </Grid>
      </Box>
    </>
  );
};

export default ArtistForm;
