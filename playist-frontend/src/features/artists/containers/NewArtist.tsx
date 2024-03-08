import { Container, Divider, Typography } from '@mui/material';
import ArtistForm from '../components/ArtistForm';
import { ArtistMutation } from '../../../types';
import { useAppDispatch } from '../../../app/hooks';
import { useNavigate } from 'react-router-dom';
import { createArtist } from '../artistsThunk';

const NewArtist = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const onFormSubmit = async (artist: ArtistMutation) => {
    try {
      await dispatch(createArtist(artist)).unwrap();
      navigate('/');
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container disableGutters>
      <Typography variant="h4" gutterBottom textAlign="center">
        New artist
      </Typography>
      <Divider sx={{ borderColor: 'seagreen', mb: 6 }} />

      <ArtistForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewArtist;
