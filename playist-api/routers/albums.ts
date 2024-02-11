import {Router} from 'express';
import {imagesUpload} from '../multer';
import {AlbumMutation} from '../types';
import Album from '../models/Album';
import mongoose, {Types} from 'mongoose';

const albumsRouter = Router();

albumsRouter.get('/', async (req, res, next) => {
  try {
    let albums;
    const artistId = req.query.artist;
    
    if (artistId && typeof artistId === 'string') {
      try {
        new Types.ObjectId(artistId);
      } catch {
        return res.status(404).send({error: 'Wrong artist ID!'});
      }
      albums = await Album.find({artist: req.query.artist});
    } else {
      albums = await Album.find();
    }
    
    res.send(albums);
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
      cover: req.file ? req.file.filename : null
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