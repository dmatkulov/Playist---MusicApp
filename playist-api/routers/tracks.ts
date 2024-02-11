import {Router} from 'express';
import {TrackMutation} from '../types';
import {Types} from 'mongoose';
import Track from '../models/Track';

const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    const albumId = req.query.album;
    
    if (albumId && typeof albumId === 'string') {
      try {
        new Types.ObjectId(albumId);
      } catch {
        return res.status(404).send({error: 'Wrong album ID!'});
      }
      tracks = await Track.find({album: albumId});
    } else {
      tracks = await Track.find();
    }
    
    res.send(tracks);
  } catch (e) {
    return next(e);
  }
});

tracksRouter.post('/', async (req, res, next) => {
  try {
    const trackData: TrackMutation = {
      album: req.body.album,
      title: req.body.title,
      duration: req.body.duration
    };
    
    const track = new Track(trackData);
    await track.save();
    
    res.send(track);
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;