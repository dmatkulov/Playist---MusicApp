import React from 'react';
import {
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { Artist } from '../../../types';
import { apiURL } from '../../../constants';
import { useNavigate } from 'react-router-dom';

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  let cardImage = noCoverImage;
  const navigate = useNavigate();

  if (artist.cover) {
    cardImage = apiURL + '/' + artist.cover;
  }

  return (
    <Card
      sx={{
        borderRadius: '12px',
        padding: 1.5,
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
      }}
    >
      <CardMedia
        image={cardImage}
        sx={{
          borderRadius: '6px',
          width: '100%',
          height: '200px',
          backgroundColor: 'rgba(0,0,0,0.8)',
        }}
      />
      <CardContent
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flex: '1 0 auto',
        }}
      >
        <Typography component="div" variant="h5">
          {artist.name}
        </Typography>
        <IconButton onClick={() => navigate('/albums/' + artist._id)}>
          <PlayCircleIcon fontSize="large" sx={{ color: 'seagreen' }} />
        </IconButton>
      </CardContent>
    </Card>
  );
};

export default ArtistCard;
