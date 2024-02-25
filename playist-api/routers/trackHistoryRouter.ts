import { Router } from 'express';
import { Types } from 'mongoose';
import Track from '../models/Track';
import TrackHistory from '../models/TrackHistory';
import auth, { RequestWithUser } from '../middleware/auth';

const tracksHistoryRouter = Router();
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
      return res.status(404).send({ error: 'Track not found' });
    }

    const trackHistory = new TrackHistory({
      username: userId,
      track: _id,
      datetime: new Date(),
    });

    await trackHistory.save();

    return res.send(trackHistory);
  } catch (e) {
    next(e);
  }
});

export default tracksHistoryRouter;
