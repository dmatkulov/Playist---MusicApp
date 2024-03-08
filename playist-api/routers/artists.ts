import { Router } from 'express';
import Artist from '../models/Artist';
import { ArtistMutation } from '../types';
import mongoose, { Types } from 'mongoose';
import { imagesUpload } from '../multer';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import userRole from '../middleware/userRole';

const artistsRouter = Router();

artistsRouter.get('/', userRole, async (req: RequestWithUser, res, next) => {
  try {
    let artists;
    if (req.user) {
      const isAdmin = req.user.role === 'admin';
      const isUser = req.user.role === 'user';

      if (isAdmin) {
        artists = await Artist.find({}, { user: 0 }).sort({ _id: -1 });
      }

      if (isUser) {
        artists = await Artist.find(
          {
            $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }],
          },
          { user: 0 },
        ).sort({ _id: -1 });
      }
    } else {
      artists = await Artist.find({ isPublished: true }, { user: 0 }).sort({ _id: -1 });
    }
    return res.send(artists);
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

      try {
        new Types.ObjectId(_id);
      } catch {
        return res.status(404).send({ error: 'Wrong artist ID!' });
      }

      if (req.user) {
        const isAdmin = req.user?.role === 'admin';
        const isUser = req.user?.role === 'user';

        if (isAdmin) {
          await Artist.findByIdAndDelete(_id);
          return res.send({ message: 'Artist was deleted by admin' });
        } else if (isUser) {
          await Artist.findOneAndDelete({ _id, user: userId, isPublished: false });
          return res.send({ message: 'Artist was deleted by user' });
        }
      } else {
        return res.status(403).send({ error: 'Forbidden! You have no rights to delete!' });
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
