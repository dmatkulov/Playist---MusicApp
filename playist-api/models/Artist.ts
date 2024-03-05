import mongoose from 'mongoose';
import { ArtistFields } from '../types';

const ArtistSchema = new mongoose.Schema<ArtistFields>({
  name: {
    type: String,
    required: [true, 'Artist name cannot be empty'],
  },
  about: String,
  cover: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Artist = mongoose.model('Artist', ArtistSchema);

export default Artist;
