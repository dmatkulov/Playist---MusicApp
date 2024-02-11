export interface ArtistMutation {
  name: string,
  about: string,
  cover: string | null,
}

export interface AlbumMutation {
  artist: string,
  title: string,
  yearOfRelease: number,
  cover: string | null,
}

export interface TrackMutation {
  album: string,
  title: string,
  duration: string,
}