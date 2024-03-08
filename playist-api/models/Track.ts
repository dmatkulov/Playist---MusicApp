import mongoose, { Schema, Types } from 'mongoose';
import Album from './Album';
import { TrackFields } from '../types';
import User from './User';

const TrackSchema = new mongoose.Schema<TrackFields>({
  user: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const user = await User.findById(value);
        return Boolean(user);
      },
      message: 'User does not exist!',
    },
  },
  album: {
    type: Schema.Types.ObjectId,
    ref: 'Album',
    required: [true, 'Album must be present'],
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
    required: true,
  },
  isPublished: {
    type: Boolean,
    required: true,
    default: false,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
