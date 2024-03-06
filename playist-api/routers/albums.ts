import { Router } from 'express';
import { imagesUpload } from '../multer';
import { AlbumFields, AlbumMutation } from '../types';
import Album from '../models/Album';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/Artist';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    const artistId = req.query.artist;

    if (artistId) {
      try {
        new Types.ObjectId(artistId.toString());
      } catch {
        return res.status(404).send({ error: 'Wrong artist ID!' });
      }

      const allAlbums = await Album.find({ artist: artistId }).sort({ yearOfRelease: -1 });
      const artist = await Artist.findById(artistId).select('name');

      if (!artist) {
        return res.status(404).send({ error: 'Artist not found!' });
      }

      albums = {
        artist,
        albums: allAlbums,
      };
    } else {
      albums = await Album.find();
    }

    res.send(albums);
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

    const album = await Album.findById(albumId);

    if (!album) {
      return res.status(404).send({ error: 'Album not found!' });
    }

    const results = await Album.findById(albumId).populate('artist', '_id name about cover');

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

      if (!userId) {
        return res.status(404).send({ error: 'User not found' });
      }

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

      const adminRole = req.user?.role === 'admin';
      const userRole = req.user?.role === 'user';

      try {
        new Types.ObjectId(_id);
      } catch {
        return res.status(404).send({ error: 'Wrong album ID!' });
      }

      const album = await Album.findById<AlbumFields>(_id);

      if (!album) {
        return res.status(404).send({ error: 'Album not found' });
      }

      if (adminRole) {
        await Album.findByIdAndDelete(_id);
        return res.send({ message: 'Album was deleted by admin' });
      } else if (userRole) {
        if (userId?.toString() === album.user.toString() && !album.isPublished) {
          await Album.findOneAndDelete<AlbumFields>({ _id, user: userId, isPublished: false });
          return res.send({ message: 'Album was deleted by user' });
        } else {
          return res.status(403).send({ error: 'Forbidden! You have no rights to delete!' });
        }
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
