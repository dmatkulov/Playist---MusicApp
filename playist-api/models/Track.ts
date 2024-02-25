import mongoose, { Schema, Types } from 'mongoose';
import Album from './Album';

const TrackSchema = new mongoose.Schema({
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
    required: true,
  },
  duration: String,
  listing: {
    type: Number,
    required: true,
  },
});

const Track = mongoose.model('Track', TrackSchema);

export default Track;
