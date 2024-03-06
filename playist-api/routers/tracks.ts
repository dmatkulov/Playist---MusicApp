import { Router } from 'express';
import { TrackFields, TrackMutation } from '../types';
import { Types } from 'mongoose';
import Track from '../models/Track';
import Album from '../models/Album';
import Artist from '../models/Artist';
import auth, { RequestWithUser } from '../middleware/auth';
import permit from '../middleware/permit';

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
      const allTracks = await Track.find({ album: albumId }).sort({ listing: 1 });

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

tracksRouter.post('/', auth, permit('admin', 'user'), async (req: RequestWithUser, res, next) => {
  try {
    const userId = req.user?._id;

    if (!userId) {
      return res.status(404).send({ error: 'User not found' });
    }

    const trackData: TrackMutation = {
      user: userId,
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

tracksRouter.delete(
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
        return res.status(404).send({ error: 'Wrong track ID' });
      }

      const track = await Track.findById<TrackFields>(_id);

      if (!track) {
        return res.status(404).send({ error: 'Track not found' });
      }

      if (adminRole) {
        await Track.findByIdAndDelete(_id);
        return res.send({ message: 'Track was deleted by admin' });
      } else if (userRole) {
        if (userId?.toString() === track.user.toString() && !track.isPublished) {
          await Track.findOneAndDelete<TrackFields>({ _id, user: userId, isPublished: false });
          return res.send({ message: 'Track was deleted by user' });
        } else {
          return res.status(403).send({ error: 'Forbidden! You have no rights to delete!' });
        }
      }
    } catch (e) {
      return next(e);
    }
  },
);

export default tracksRouter;
