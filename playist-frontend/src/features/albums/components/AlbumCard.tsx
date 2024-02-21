import React from 'react';
import { Box, Card, CardContent, CardMedia, Typography } from '@mui/material';
import { Album } from '../../../types';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { apiURL } from '../../../constants';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  let cardImage = noCoverImage;
  
  if (album.cover) {
    cardImage = apiURL + '/' + album.cover;
  }
  return (
    <div>
      AlbumCard
      <Card
        elevation={0}
        sx={{
          borderRadius: '12px',
          padding: 1.5,
          boxShadow: 0,
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
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box sx={{ pr: 2 }}>
            <Typography gutterBottom variant="body2">
              {album.title}
            </Typography>
            <Typography display="block" variant="caption" color="text.secondary">
              {album.yearOfRelease}
            </Typography>
            <Typography variant="caption" color="text.secondary">
              {album.totalTracks}
            </Typography>
          </Box>
        </CardContent>
      </Card>
    </div>
  );
};

export default AlbumCard;