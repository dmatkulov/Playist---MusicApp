import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { Container, Divider, Grid, Stack, Typography } from '@mui/material';
import { useAppDispatch, useAppSelector } from '../../../app/hooks';
import { selectAlbums, selectAlbumsLoading } from '../albumsSlice';
import { fetchAlbums } from '../albumsThunk';
import AlbumCard from '../components/AlbumCard';
import LoadingPage from '../../../components/UI/LoadingPage/LoadingPage';

const AlbumList: React.FC = () => {
  const dispatch = useAppDispatch();
  const albums = useAppSelector(selectAlbums);
  const isLoading = useAppSelector(selectAlbumsLoading);
  const { artistId } = useParams() as { artistId: string };
  
  useEffect(() => {
    dispatch(fetchAlbums(artistId));
  }, [dispatch]);
  
  return (
    <Container>
      {isLoading && <LoadingPage />}
      
      {albums && (
        <Grid container>
          <Stack direction="column" spacing={3} width="100%">
            {albums && <Typography variant="h4">{albums.artist}</Typography>}
            <Divider />
          </Stack>
          
          <Grid item container spacing={2} py={4} mt={4}>
            {albums.albums.length > 0 &&
              albums.albums.map((album) => (
                <Grid key={album._id} item xs={4}>
                  <AlbumCard album={album} />
                </Grid>
              ))}
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default AlbumList;
