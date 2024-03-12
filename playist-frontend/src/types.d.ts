export interface User {
  _id: string;
  email: string;
  token: string;
  role: string;
  displayName: string;
  avatar: string;
}

export interface Artist {
  _id: string;
  name: string;
  about: string | null;
  cover: string | null;
  isPublished: boolean;
}

export interface UserMutation {
  email: string;
  displayName: string;
  avatar: File | null;
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
  email: string;
  displayName: string;
  password: string;
  avatar: File | null;
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
