import mongoose, { Schema, Types } from 'mongoose';
import Artist from './Artist';
import { AlbumFields } from '../types';

const AlbumSchema = new mongoose.Schema<AlbumFields>({
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: [true, 'Artist ID must be present'],
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
  title: {
    type: String,
    required: [true, 'Title must be present'],
  },
  yearOfRelease: {
    type: Number,
    required: [true, 'Enter year of release'],
  },
  cover: String,
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Album = mongoose.model('Album', AlbumSchema);

export default Album;
