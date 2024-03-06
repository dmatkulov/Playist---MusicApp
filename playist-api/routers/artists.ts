import { Router } from 'express';
import Artist from '../models/Artist';
import { ArtistFields, ArtistMutation, UserFields } from '../types';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import User from '../models/User';

const artistsRouter = Router();

artistsRouter.get('/', async (req, res, next) => {
  try {
    let published;

    const userId = req.query.userId as string;

    if (userId) {
      try {
        new Types.ObjectId(userId);
      } catch {
        return res.status(404).send({ error: 'Wrong user ID!' });
      }

      const user = await User.findById<UserFields>(userId);

      if (!user) {
        return res.send({ error: 'User not found' });
      }

      const adminRole = user.role === 'admin';
      const userRole = user.role === 'user';

      if (adminRole) {
        published = await Artist.find();
      }

      if (userRole) {
        published = await Artist.find({
          $or: [{ isPublished: true }, { user: userId, isPublished: false }],
        });
      }
    }

    if (userId === undefined) {
      published = await Artist.find({ isPublished: true });
    }

    return res.send(published);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.get('/:id', async (req, res, next) => {
  try {
    const artistId = req.params.id;

    try {
      new Types.ObjectId(artistId);
    } catch {
      return res.status(404).send({ error: 'Wrong artist ID!' });
    }

    const artist = await Artist.findById(artistId);

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found!' });
    }

    res.send(artist);
  } catch (e) {
    return next(e);
  }
});

artistsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('cover'),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;

      if (!userId) {
        return res.status(404).send({ error: 'User not found' });
      }

      const artistData: ArtistMutation = {
        user: userId,
        name: req.body.name,
        about: req.body.about,
        cover: req.file ? req.file.filename : null,
      };

      const artist = new Artist(artistData);

      await artist.save();
      return res.send(artist);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

artistsRouter.delete(
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
        return res.status(404).send({ error: 'Wrong artist ID!' });
      }

      const artist = await Artist.findById<ArtistFields>(_id);

      if (!artist) {
        return res.status(404).send({ error: 'Artist not found' });
      }

      if (adminRole) {
        await Artist.findByIdAndDelete(_id);
        return res.send({ message: 'Artist was deleted by admin' });
      } else if (userRole) {
        if (userId?.toString() === artist.user.toString() && !artist.isPublished) {
          await Artist.findOneAndDelete<ArtistFields>({ _id, user: userId, isPublished: false });
          return res.send({ message: 'Artist was deleted by user' });
        } else {
          return res.status(403).send({ error: 'Forbidden! You have no rights to delete!' });
        }
      }
    } catch (e) {
      return next(e);
    }
  },
);

artistsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const _id = req.params.id;

    try {
      new Types.ObjectId(_id);
    } catch {
      return res.status(404).send({ error: 'Wrong artist ID!' });
    }

    const artist = await Artist.findById(_id);

    if (!artist) {
      return res.status(404).send({ error: 'Artist not found' });
    }

    artist.isPublished = !artist.isPublished;

    await artist.save();

    return res.send(artist);
  } catch (e) {
    return next(e);
  }
});
export default artistsRouter;
