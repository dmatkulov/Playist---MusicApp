import { Router } from 'express';
import User from '../models/User';
import { Types } from 'mongoose';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';

const tracksHistoryRouter = Router();
tracksHistoryRouter.post('/', async (req, res, next) => {
  try {
    const headerValue = req.get('Authorization');

    if (!headerValue) {
      return res.status(401).send({ error: 'No Authorization header present' });
    }

    const [_bearer, token] = headerValue.split(' ');

    if (!token) {
      return res.status(401).send({ error: 'Token is absent in headers' });
    }

    const user = await User.findOne({ token });

    if (!user) {
      return res.status(401).send({ error: 'Wrong token' });
    }

    const trackId = req.body.trackId as string;

    try {
      new Types.ObjectId(trackId);
    } catch (e) {
      return res.status(404).send({ error: 'Wrong track ID!' });
    }

    const track = await Track.findById(trackId);

    if (!track) {
      return res.status(404).send({ error: 'Track not found' });
    }

    const trackHistory = new TrackHistory({
      username: user._id,
      track: trackId,
      datetime: new Date(),
    });

    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

export default tracksHistoryRouter;
