import mongoose, { Types } from 'mongoose';
import User from './User';
import Track from './Track';
import { TrackHistoryFields } from '../types';
import Artist from './Artist';

const Schema = mongoose.Schema;

const TrackHistorySchema = new Schema<TrackHistoryFields>({
  email: {
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
  track: {
    type: Schema.Types.ObjectId,
    ref: 'Track',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const track = await Track.findById(value);
        return Boolean(track);
      },
      message: 'Track does not exist!',
    },
  },
  datetime: Date,
  artist: {
    type: Schema.Types.ObjectId,
    ref: 'Artist',
    required: true,
    validate: {
      validator: async (value: Types.ObjectId) => {
        const artist = await Artist.findById(value);
        return Boolean(artist);
      },
      message: 'Artist does not exist!',
    },
  },
});

const TrackHistory = mongoose.model('TrackHistory', TrackHistorySchema);

export default TrackHistory;
