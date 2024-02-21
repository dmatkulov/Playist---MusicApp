export interface Artist {
  _id: string;
  name: string;
  about: string | null;
  cover: string | null;
}

export interface Album {
  artist: string;
  albums: AlbumMutation[];
}

interface AlbumMutation {
  _id: string;
  title: string;
  yearOfRelease: number;
  cover: string | null;
}
