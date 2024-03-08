import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { AlbumMutation } from '../../../types';
import { createAlbum } from '../albumsThunk';
import { Container, Divider, Typography } from '@mui/material';
import AlbumForm from '../components/AlbumForm';

const NewAlbum = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFormSubmit = async (artist: AlbumMutation) => {
    try {
      await dispatch(createAlbum(artist)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <Container disableGutters>
      <Typography variant="h4" gutterBottom textAlign="center">
        New album
      </Typography>
      <Divider sx={{ borderColor: 'seagreen', mb: 6 }} />

      <AlbumForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewAlbum;
