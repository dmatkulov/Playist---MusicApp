import React from 'react';
import { Chip, Grid } from '@mui/material';
import MenuActions from './MenuActions';
import { useAppSelector } from '../../app/hooks';
import { selectUser } from '../../features/users/usersSlice';

interface Props {
  onPublish?: React.MouseEventHandler;
  onDelete: React.MouseEventHandler;
  isPublished?: boolean;
  isDeleting: boolean;
  isPublishing: boolean;
}

const CardMenu: React.FC<Props> = ({
  onPublish,
  onDelete,
  isPublished = true,
  isDeleting,
  isPublishing,
}) => {
  const user = useAppSelector(selectUser);

  return (
    <>
      {user && user.role === 'user' && !isPublished && (
        <Grid container justifyContent="space-between" alignItems="center">
          <Chip label="Unpublished" color="error" size="small" />
          <MenuActions
            onDelete={onDelete}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
          />
        </Grid>
      )}

      {user && user.role === 'admin' && !isPublished && (
        <Grid container justifyContent="space-between" alignItems="center">
          <Chip label="Unpublished" color="error" size="small" />
          <MenuActions
            onPublish={onPublish}
            onDelete={onDelete}
            isPublished={isPublished}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
          />
        </Grid>
      )}

      {user && user.role === 'admin' && isPublished && (
        <Grid container justifyContent="flex-end" alignItems="center">
          <MenuActions
            onDelete={onDelete}
            isPublishing={isPublishing}
            isDeleting={isDeleting}
          />
        </Grid>
      )}
    </>
  );
};

export default CardMenu;
