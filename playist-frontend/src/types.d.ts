export interface Artist {
  _id: string;
  name: string;
  about: string | null;
  cover: string | null;
}

export interface Album {
  _id: string;
  title: string;
  yearOfRelease: number;
  totalTracks: number;
  cover: string | null;
}