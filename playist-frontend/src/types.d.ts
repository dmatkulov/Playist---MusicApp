export interface User {
  _id: string;
  username: string;
  token: string;
  role: string;
}

export interface Artist {
  _id: string;
  name: string;
  about: string | null;
  cover: string | null;
  isPublished: boolean;
}

export interface ArtistApi {
  _id: string;
  name: string;
}

interface Album {
  _id: string;
  title: string;
  artist: string;
  yearOfRelease: number;
  cover: string | null;
  isPublished: boolean;
}

export interface Track {
  _id: string;
  title: string;
  album: string;
  duration: string;
  listing: string;
  isPublished: boolean;
}

export interface TrackApi {
  album: {
    _id: string;
    artist: {
      _id: string;
      name: string;
    };
    title: string;
    yearOfRelease: number;
    cover: string | null;
  };
  tracks: Track[];
}

export interface RecentTrack {
  _id: string;
  track: {
    _id: string;
    title: string;
  };
  artist: {
    _id: string;
    name: string;
  };
  datetime: string;
}

export interface AlbumApi {
  artist: {
    _id: string;
    name: string;
  };
  albums: Album[];
}

interface RecentTrackApi {
  _id: string;
}

//mutations

export interface ArtistMutation {
  name: string;
  about: string;
  cover: File | null;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  yearOfRelease: string;
  cover: File | null;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
  listing: string;
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
