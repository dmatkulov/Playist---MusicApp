import React from 'react';
import { Button, Link } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate } from 'react-router-dom';

interface Props {
  location: string;
}

const BackLink: React.FC<Props> = ({ location }) => {
  const navigate = useNavigate();

  return (
    <div>
      <Button
        component={Link}
        startIcon={<ArrowBackIcon />}
        onClick={() => navigate(-1)}
        sx={{ textTransform: 'none', fontWeight: 'normal' }}
      >
        Back to {location}
      </Button>
    </div>
  );
};

export default BackLink;
