import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  about: String,
  cover: String,
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
