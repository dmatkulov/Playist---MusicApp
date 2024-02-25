export interface User {
  _id: string;
  username: string;
  token: string;
}

export interface Artist {
  _id: string;
  name: string;
  about: string | null;
  cover: string | null;
}

interface Album {
  _id: string;
  title: string;
  yearOfRelease: number;
  cover: string | null;
}

interface TrackHistory {
  _id: string;
}

//mutations
export interface AlbumMutation {
  artist: string;
  albums: Album[];
}

export interface TrackMutation {
  _id: string;
  album: string;
  title: string;
  duration: string;
  listing: string;
}

export interface Track {
  artist: Artist;
  album: Album;
  tracks: TrackMutation[];
}

export interface RegisterMutation {
  username: string;
  password: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

//errors & responses
export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    };
  };
  message: string;
  name: string;
  _message: string;
}

export interface GlobalError {
  error: string;
}
