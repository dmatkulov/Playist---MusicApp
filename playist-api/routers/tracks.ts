import { Router } from 'express';
import { TrackFields, TrackMutation } from '../types';
import { Types } from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import userRole from '../middleware/userRole';

const tracksRouter = Router();

tracksRouter.get('/', userRole, async (req: RequestWithUser, res, next) => {
  try {
    const albumId = req.query.album as string;

    if (albumId) {
      try {
        new Types.ObjectId(albumId.toString());
      } catch {
        return res.status(404).send({ error: 'Wrong album ID!' });
      }

      const album = await Album.findById(albumId, { user: 0, isPublished: 0 }).populate({
        path: 'artist',
        select: 'name',
      });
      let tracks;

      if (req.user) {
        const isAdmin = req.user.role === 'admin';
        const isUser = req.user.role === 'user';

        if (isAdmin) {
          tracks = await Track.find({ album: albumId }, { user: 0 }).sort({ listing: 1 });
        } else if (isUser) {
          tracks = await Track.find(
            {
              album: albumId,
              $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }],
            },
            { user: 0 },
          ).sort({ listing: 1 });
        }
      } else {
        tracks = await Track.find({ album: albumId, isPublished: true }, { user: 0 }).sort({
          listing: 1,
        });
      }

      return res.send({ album, tracks });
    }
  } catch (e) {
    return next(e);
  }
});

tracksRouter.post('/', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(404).send({ error: 'User not found' });
    }

    const trackData: TrackMutation = {
      user: userId,
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration,
      listing: parseFloat(req.body.listing),
    };

    const track = new Track(trackData);
    await track.save();

    res.send(track);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.delete(
  '/:id',
  auth,
  permit('admin', 'user'),
  async (req: RequestWithUser, res, next) => {
    try {
      const _id = req.params.id;
      const userId = req.user?._id;

      const adminRole = req.user?.role === 'admin';
      const userRole = req.user?.role === 'user';

      try {
        new Types.ObjectId(_id);
      } catch {
        return res.status(404).send({ error: 'Wrong track ID' });
      }

      const track = await Track.findById<TrackFields>(_id);

      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }

      if (adminRole) {
        await Track.findByIdAndDelete(_id);
        return res.send({ message: 'Track was deleted by admin' });
      } else if (userRole) {
        if (userId?.toString() === track.user.toString() && !track.isPublished) {
          await Track.findOneAndDelete<TrackFields>({ _id, user: userId, isPublished: false });
          return res.send({ message: 'Track was deleted by user' });
        } else {
          return res.status(403).send({ error: 'Forbidden! You have no rights to delete!' });
        }
      }
    } catch (e) {
      return next(e);
    }
  },
);

tracksRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const _id = req.params.id;

    try {
      new Types.ObjectId(_id);
    } catch {
      return res.status(404).send({ error: 'Wrong track ID' });
    }

    const track = await Track.findById(_id);

    if (!track) {
      return res.status(404).send({ error: 'Track not found' });
    }

    track.isPublished = !track.isPublished;

    await track.save();

    return res.send(track);
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;
