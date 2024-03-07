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

interface Album {
  _id: string;
  title: string;
  artist: string;
  yearOfRelease: number;
  cover: string | null;
  isPublished: boolean;
}

export interface Track {
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
  tracks: TrackResponse[];
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

//mutations
export interface AlbumMutation {
  artist: {
    _id: string;
    name: string;
  };
  albums: Album[];
}

export interface TrackResponse {
  _id: string;
  title: string;
  duration: string;
  listing: string;
  isPublished: boolean;
  
}

interface TrackHistoryMutation {
  _id: string;
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
