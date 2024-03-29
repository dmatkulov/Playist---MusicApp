import { Router } from 'express';
import { imagesUpload } from '../multer';
import { AlbumMutation } from '../types';
import Album from '../models/Album';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/Artist';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';
import userRole from '../middleware/userRole';

const albumsRouter = Router();

albumsRouter.get('/', userRole, async (req: RequestWithUser, res, next) => {
  try {
    const artistId = req.query.artist as string;

    if (artistId) {
      try {
        new Types.ObjectId(artistId);
      } catch {
        return res.status(404).send({ error: 'Wrong artist ID!' });
      }

      const artist = await Artist.findById(artistId).select('name');
      let albums;

      if (req.user) {
        const isAdmin = req.user.role === 'admin';
        const isUser = req.user.role === 'user';

        if (isAdmin) {
          albums = await Album.find({ artist: artistId }, { user: 0 }).sort({
            yearOfRelease: -1,
          });
        } else if (isUser) {
          albums = await Album.find(
            {
              artist: artistId,
              $or: [{ isPublished: true }, { user: req.user._id, isPublished: false }],
            },
            { user: 0 },
          ).sort({ yearOfRelease: -1 });
        }
      } else {
        albums = await Album.find({ artist: artistId, isPublished: true }, { user: 0 }).sort({
          yearOfRelease: -1,
        });
      }
      return res.send({ artist, albums });
    }
  } catch (e) {
    return next(e);
  }
});

albumsRouter.get('/:id', async (req, res, next) => {
  try {
    const albumId = req.params.id;

    try {
      new Types.ObjectId(albumId);
    } catch {
      return res.status(404).send({ error: 'Wrong album ID!' });
    }

    const results = await Album.findById(albumId).populate('artist', '_id name about cover');

    if (!results) {
      return res.status(404).send({ error: 'Album not found!' });
    }

    res.send(results);
  } catch (e) {
    return next(e);
  }
});

albumsRouter.post(
  '/',
  auth,
  permit('admin', 'user'),
  imagesUpload.single('cover'),
  async (req: RequestWithUser, res, next) => {
    try {
      const userId = req.user?._id;

      const albumData: AlbumMutation = {
        user: userId,
        artist: req.body.artist,
        title: req.body.title,
        yearOfRelease: parseInt(req.body.yearOfRelease),
        cover: req.file ? req.file.filename : null,
      };

      const album = new Album(albumData);
      await album.save();

      res.send(album);
    } catch (e) {
      if (e instanceof mongoose.Error.ValidationError) {
        if (e.errors && e.errors.yearOfRelease) {
          e.errors.yearOfRelease.message = 'Release date must be a valid number';
        }
        return res.status(422).send(e);
      }

      next(e);
    }
  },
);

albumsRouter.delete(
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
        return res.status(404).send({ error: 'Wrong album ID!' });
      }

      if (req.user) {
        const isAdmin = req.user?.role === 'admin';
        const isUser = req.user?.role === 'user';

        if (isAdmin) {
          await Album.findByIdAndDelete(_id);
          return res.send({ message: 'Album was deleted by admin' });
        } else if (isUser) {
          await Album.findOneAndDelete({ _id, user: userId, isPublished: false });
          return res.send({ message: 'Album was deleted by user' });
        }
      } else {
        return res.status(403).send({ error: 'Forbidden! You have no rights to delete!' });
      }
    } catch (e) {
      return next(e);
    }
  },
);

albumsRouter.patch('/:id/togglePublished', auth, permit('admin'), async (req, res, next) => {
  try {
    const _id = req.params.id;

    try {
      new Types.ObjectId(_id);
    } catch {
      return res.status(404).send({ error: 'Wrong artist ID!' });
    }

    const album = await Album.findById(_id);

    if (!album) {
      return res.status(404).send({ error: 'Album not found' });
    }

    album.isPublished = !album.isPublished;

    await album.save();

    return res.send(album);
  } catch (e) {
    return next(e);
  }
});
export default albumsRouter;
