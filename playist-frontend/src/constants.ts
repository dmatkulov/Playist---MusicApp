export const apiURL = 'http://localhost:8000';
export const GOOGLE_CLIENT_ID = import.meta.env['VITE_GOOGLE_CLIENT_ID'] as string;

export const routes = {
  register: '/users',
  login: '/users/sessions',
  google: '/users/google',
  artists: '/artists',
  albumsByArtist: '/albums?artist=',
  albums: '/albums',
  tracksByAlbum: '/tracks?album=',
  trackHistory: '/track_history',
  tracks: '/tracks',
};
