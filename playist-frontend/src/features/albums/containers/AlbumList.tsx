import React from 'react';
import { useParams } from 'react-router-dom';

const AlbumList: React.FC = () => {
  const { artistId } = useParams() as { artistId: string };
  console.log(artistId);
  
  return (
    <div>
      AlbumList
    </div>
  );
};

export default AlbumList;