import { Router } from 'express';
import { TrackMutation } from '../types';
import { Types } from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import Artist from '../models/Artist';

const tracksRouter = Router();

tracksRouter.get('/', async (req, res, next) => {
  try {
    let tracks;
    const albumId = req.query.album;
    const artistId = req.query.artist;

    if (albumId) {
      try {
        new Types.ObjectId(albumId.toString());
      } catch {
        return res.status(404).send({ error: 'Wrong album ID!' });
      }
      const album = await Album.findById(albumId);
      const artist = await Artist.findById(album?.artist);
      const allTracks = await Track.find({ album: albumId }).sort({ listing: -1 });

      tracks = {
        artist,
        album,
        tracks: allTracks,
      };
    } else if (artistId) {
      try {
        new Types.ObjectId(artistId.toString());
      } catch {
        return res.status(404).send({ error: 'Wrong artist ID!' });
      }

      const albums = await Album.find({ artist: artistId });
      const allTracks = albums.map((album) => {
        return Track.find({ album: album._id });
      });
      const allTracksByArtist = await Promise.all(allTracks);

      tracks = allTracksByArtist.reduce((acc, track) => {
        return acc.concat(track);
      }, []);
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
      duration: req.body.duration,
    };

    const track = new Track(trackData);
    await track.save();

    res.send(track);
  } catch (e) {
    return next(e);
  }
});

export default tracksRouter;
