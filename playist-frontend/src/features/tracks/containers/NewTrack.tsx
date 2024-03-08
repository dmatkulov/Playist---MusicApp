import { Container, Divider, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { TrackMutation } from '../../../types';
import { createTrack } from '../tracksThunks';
import TrackForm from '../components/TrackForm';

const NewTrack = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const onFormSubmit = async (track: TrackMutation) => {
    try {
      await dispatch(createTrack(track)).unwrap();
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

      <TrackForm onSubmit={onFormSubmit} />
    </Container>
  );
};

export default NewTrack;
