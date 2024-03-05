import mongoose, { Schema, Types } from 'mongoose';
import Album from './Album';
import { TrackFields } from '../types';

const TrackSchema = new mongoose.Schema<TrackFields>({
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Album.findById(value);
        return Boolean(track);
      },
      message: 'Album does not exist!',
    },
  },
  title: {
    type: String,
    required: [true, 'Title must be present'],
  },
  duration: String,
  listing: {
    type: Number,
    required: [true, 'Track number must be present'],
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
