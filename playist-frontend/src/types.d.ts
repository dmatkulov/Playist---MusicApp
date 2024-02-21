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

export interface TrackMutation {
  album: string;
  title: string;
  duration: string;
  listing: string;
}

export interface Track {
  artist: Artist;
  album: AlbumMutation;
  tracks: TrackMutation[];
}