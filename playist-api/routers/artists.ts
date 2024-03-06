import { Router } from 'express';
import Artist from '../models/Artist';
import { ArtistFields, ArtistMutation } from '../types';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const artistsRouter = Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
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

export default artistsRouter;
