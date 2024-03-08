import React, { useCallback } from 'react';
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
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { deleteArtist, fetchArtists, toggleArtist } from '../artistsThunk';
import CardMenu from '../../../components/MenuActions/CardMenu';
import {
  selectArtistDeleteLoading,
  selectArtistPublishLoading,
} from '../artistsSlice';

interface Props {
  artist: Artist;
}

const ArtistCard: React.FC<Props> = ({ artist }) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const publishLoading = useAppSelector(selectArtistPublishLoading);
  const deleteLoading = useAppSelector(selectArtistDeleteLoading);

  let cardImage = noCoverImage;
  if (artist.cover) {
    cardImage = `${apiURL}/${artist.cover}`;
  }

  const handlePublish = useCallback(async () => {
    await dispatch(toggleArtist(artist._id));
    await dispatch(fetchArtists());
  }, [dispatch]);

  const handleDelete = useCallback(async () => {
    await dispatch(deleteArtist(artist._id));
    await dispatch(fetchArtists());
  }, [dispatch]);

  return (
    <Card
      sx={{
        borderRadius: '12px',
        padding: 1.5,
        boxShadow: '0px 14px 80px rgba(34, 35, 58, 0.2)',
        height: '100%',
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
        <CardMenu
          isPublished={artist.isPublished}
          onDelete={handleDelete}
          onPublish={handlePublish}
          isPublishing={publishLoading}
          isDeleting={deleteLoading}
        />
      </CardMedia>
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
