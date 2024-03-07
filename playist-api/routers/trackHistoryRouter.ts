import { Router } from 'express';
import { Types } from 'mongoose';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';
import Artist from '../models/Artist';
import Album from '../models/Album';

const tracksHistoryRouter = Router();

tracksHistoryRouter.get('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;

    const tracks = await TrackHistory.find({ username: userId }, { username: 0 })
      .sort({ datetime: -1 })
      .populate({ path: 'track', select: 'title datetime duration' })
      .populate({ path: 'artist', select: 'name' });

    res.send(tracks);
  } catch (e) {
    next(e);
  }
});
tracksHistoryRouter.post('/', auth, async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;

    const _id = req.body._id as string;

    try {
      new Types.ObjectId(_id);
    } catch (e) {
      return res.status(404).send({ error: 'Wrong track ID!' });
    }

    const track = await Track.findById(_id);
    if (!track) {
      return res.status(404).send({ error: 'Track not found!' });
    }

    const album = await Album.findById(track.album);
    if (!album) {
      return res.status(404).send({ error: 'Album not found!' });
    }

    const artist = await Artist.findById(album.artist);
    if (!artist) {
      return res.status(404).send({ error: 'Artist not found for the album!' });
    }

    const trackHistory = new TrackHistory({
      username: userId,
      track: _id,
      datetime: new Date(),
      artist: artist._id,
    });

    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

export default tracksHistoryRouter;
