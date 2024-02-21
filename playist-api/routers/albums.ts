import { Router } from 'express';
import { imagesUpload } from '../multer';
import { AlbumMutation } from '../types';
import Album from '../models/Album';
import mongoose, { Types } from 'mongoose';
import Artist from '../models/Artist';

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

      const artist = await Artist.findById(artistId);
      albums = {
        artist: artist?.name,
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

albumsRouter.post('/', imagesUpload.single('cover'), async (req, res, next) => {
  try {
    const albumData: AlbumMutation = {
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
});

export default albumsRouter;
