import {Router} from 'express';
import Artist from '../models/Artist';
import {ArtistMutation} from '../types';
import mongoose from 'mongoose';

const artistsRouter = Router();

artistsRouter.get('/', async (_req, res, next) => {
  try {
    const artists = await Artist.find();
    res.send(artists);
  } catch (e) {
    return next(e);
  }
});


artistsRouter.post('/', async (req, res, next) => {
  try {
    const artistData: ArtistMutation = {
      name: req.body.name,
      about: req.body.about,
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
});

export default artistsRouter;