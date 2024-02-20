import React from 'react';
import ArtistCard from '../components/ArtistCard';
import { Grid } from '@mui/material';

const ArtistList: React.FC = () => {
  return (
    <Grid container my={4} rowSpacing={2} columnSpacing={1}>
      ArtistList
      <ArtistCard />
    </Grid>
  );
};

export default ArtistList;