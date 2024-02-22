export interface Artist {
  _id: string;
  name: string;
  about: string | null;
  cover: string | null;
}

export interface AlbumMutation {
  artist: string;
  albums: Album[];
}

interface Album {
  _id: string;
  title: string;
  yearOfRelease: number;
  cover: string | null;
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
