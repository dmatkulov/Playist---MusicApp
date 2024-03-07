import React, { useCallback } from 'react';
import { Box, Card, CardContent, CardMedia, Divider, Grid, IconButton, Typography } from '@mui/material';
import { Album } from '../../../types';
import noCoverImage from '../../../assets/images/artist-image-no-available.jpg';
import { apiURL } from '../../../constants';
import PlayCircleIcon from '@mui/icons-material/PlayCircle';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../../app/hooks';
import { deleteAlbum, fetchAlbums, publishAlbum } from '../albumsThunk';
import CardMenu from '../../../components/MenuActions/CardMenu';

interface Props {
  album: Album;
}

const AlbumCard: React.FC<Props> = ({ album }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  
  let cardImage = noCoverImage;
  if (album.cover) {
    cardImage = apiURL + '/' + album.cover;
  }
  
  const handlePublish = useCallback(async () => {
    await dispatch(publishAlbum(album._id));
    dispatch(fetchAlbums(album.artist));
  }, []);
  
  const handleDelete = useCallback(async () => {
    await dispatch(deleteAlbum(album._id));
    await dispatch(fetchAlbums(album.artist));
  }, []);
  
  
  return (
    <>
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
            p: 1,
          }}
        >
          <CardMenu isPublished={album.isPublished} onDelete={handleDelete} onPublish={handlePublish} />
        </CardMedia>
        <CardContent sx={{ flex: '1 0 auto' }}>
          <Box>
            <Typography gutterBottom variant="h6">
              {album.title}
            </Typography>
            <Divider />
            <Grid
              container
              justifyContent="space-between"
              alignItems="center"
              mt={2}
            >
              <Typography
                display="block"
                variant="subtitle2"
                color="text.secondary"
              >
                {album.yearOfRelease}
              </Typography>
              <IconButton
                onClick={() => navigate('/albums/tracks/' + album._id)}
              >
                <PlayCircleIcon fontSize="medium" />
              </IconButton>
            </Grid>
          </Box>
        </CardContent>
      </Card>
    </>
  );
};

export default AlbumCard;
