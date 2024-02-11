import mongoose from 'mongoose';

const ArtistSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: String
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;