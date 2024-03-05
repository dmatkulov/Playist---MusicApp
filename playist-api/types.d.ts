import { Model } from 'mongoose';

/* Schema Fields */
export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface ArtistFields {
  name: string;
  about: string;
  cover: string;
  isPublished: boolean;
}

export interface AlbumFields {
  artist: mongoose.Types.ObjectId;
  title: string;
  yearOfRelease: number;
  cover: string;
  isPublished: boolean;
}

export interface TrackFields {
  album: mongoose.Types.ObjectId;
  title: string;
  duration: string;
  listing: number;
  isPublished: boolean;
}

export interface TrackHistoryFields {
  username: mongoose.Types.ObjectId;
  track: mongoose.Types.ObjectId;
  datetime: string;
  artist: mongoose.Types.ObjectId;
}

/* Mutations */

export interface ArtistMutation {
  name: string;
  about: string;
  cover: string | null;
}

export interface AlbumMutation {
  artist: string;
  title: string;
  yearOfRelease: number;
  cover: string | null;
}

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
}

/* Schema Methods */

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
