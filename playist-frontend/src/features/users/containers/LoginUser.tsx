import React, { useEffect, useState } from 'react';
import {
  Alert,
  Avatar,
  Box,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from '@mui/material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { LockOpen } from '@mui/icons-material';
import { LoadingButton } from '@mui/lab';

import { login } from '../usersThunks';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import {
  selectLoginError,
  selectLoginLoading,
  setLoginError,
} from '../usersSlice';

import { LoginMutation } from '../../../types';

const LoginUser: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const error = useAppSelector(selectLoginError);
  const loading = useAppSelector(selectLoginLoading);

  const [state, setState] = useState<LoginMutation>({
    username: '',
    password: '',
  });

  const inputChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setState((prevState) => {
      return { ...prevState, [name]: value };
    });
  };

  useEffect(() => {
    dispatch(setLoginError(null));
  }, [dispatch]);

  const submitFormHandler = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      await dispatch(login(state)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
          <LockOpen />
        </Avatar>
        <Typography component="h1" variant="h5">
          Sign in
        </Typography>

        {error && (
          <Alert severity="error" sx={{ mt: 3, width: '100%' }}>
            {error.error}
          </Alert>
        )}
        <Box component="form" onSubmit={submitFormHandler} sx={{ mt: 3 }}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                label="Username"
                name="username"
                fullWidth
                autoComplete="current-username"
                value={state.username}
                onChange={inputChangeHandler}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                name="password"
                label="Password"
                type="password"
                fullWidth
                autoComplete="current-password"
                value={state.password}
                onChange={inputChangeHandler}
              />
            </Grid>
          </Grid>
          <Grid item xs={12} textAlign="center">
            <LoadingButton
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2, py: 1 }}
              disableElevation
              disabled={loading}
              loading={loading}
            >
              Sign In
            </LoadingButton>
          </Grid>
          <Grid container justifyContent="center">
            <Grid item>
              <Link component={RouterLink} to="/register" variant="body2">
                New user? Sign Up
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default LoginUser;
