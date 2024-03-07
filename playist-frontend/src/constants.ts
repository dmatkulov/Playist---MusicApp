export const apiURL = 'http://localhost:8000';

export const routes = {
  artists: '/artists',
  albumsByArtist: '/albums?artist=',
  albums: '/albums',
  tracksByAlbum: '/tracks?album=',
  register: '/users',
  login: '/users/sessions',
  trackHistory: '/track_history',
  tracks: '/tracks',
};
