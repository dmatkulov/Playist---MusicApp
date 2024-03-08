import mongoose, { Model } from 'mongoose';

/* Schema Fields */
export interface UserFields {
  username: string;
  password: string;
  token: string;
  role: string;
}

export interface ArtistFields {
  user: mongoose.Types.ObjectId;
  name: string;
  about: string;
  cover: string;
  isPublished: boolean;
}

export interface AlbumFields {
  user: mongoose.Types.ObjectId;
  artist: mongoose.Types.ObjectId;
  title: string;
  yearOfRelease: number;
  cover: string;
  isPublished: boolean;
}

export interface TrackFields {
  user: mongoose.Types.ObjectId;
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
  user: mongoose.Types.ObjectId;
  name: string;
  about: string;
  cover: string | null;
}

export interface AlbumMutation {
  user: mongoose.Types.ObjectId;
  artist: string;
  title: string;
  yearOfRelease: number;
  cover: string | null;
}

export interface TrackMutation {
  user: mongoose.Types.ObjectId;
  album: string;
  title: string;
  duration: string;
  listing: number;
}

/* Schema Methods */

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;
  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;
