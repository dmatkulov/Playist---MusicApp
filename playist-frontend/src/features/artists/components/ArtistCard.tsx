import React from 'react';
import { Card, CardContent, CardMedia, Grid } from '@mui/material';
import { Info } from '@mui/icons-material';

const ArtistCard: React.FC = () => {
  return (
    <Grid item xs={4}>
      <Card
        sx={{
          borderRadius: '12px',
          padding: 1.5,
          boxShadow: 0,
        }}
      >
        <CardMedia
          image={
            'https://images.unsplash.com/photo-1500462918059-b1a0cb512f1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=934&q=80'
          }
          sx={{
            borderRadius: '6px',
            width: '100%',
            height: 0,
            paddingBottom: 'min(75%, 240px)',
            backgroundColor: 'rgba(0,0,0,0.08)',
          }}
        />
        <CardContent>
          <Info>
            Info
          </Info>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default ArtistCard;