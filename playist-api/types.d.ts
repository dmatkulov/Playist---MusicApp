import { Model, Types } from 'mongoose';

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

export interface UserFields {
  username: string;
  password: string;
  token: string;
}

interface UserMethods {
  checkPassword(password: string): Promise<boolean>;

  generateToken(): void;
}

type UserModel = Model<UserFields, unknown, UserMethods>;

export interface TrackHistoryFields {
  username: Types.ObjectId;
  track: Types.ObjectId;
  datetime: string;
}
