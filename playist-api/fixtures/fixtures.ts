import mongoose from 'mongoose';
import config from '../config';
import Artist from '../models/Artist';
import Album from '../models/Album';
import Track from '../models/Track';
import User from '../models/User';
import { randomUUID } from 'node:crypto';
import TrackHistory from '../models/TrackHistory';
import path from 'path';

const dropCollection = async (db: mongoose.Connection, collectionName: string) => {
  try {
    await db.dropCollection(collectionName);
  } catch (e) {
    console.log(`Collection ${collectionName} was missing, skipping drop...`);
  }
};

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  const db = mongoose.connection;

  const collections = ['albums', 'artists', 'trackhistories', 'tracks', 'users'];

  for (const collectionName of collections) {
    await dropCollection(db, collectionName);
  }

  const [artist1, artist2] = await Artist.create(
    {
      name: 'The Beatles',
      about: 'The Beatles were an English rock band formed in Liverpool in 1960.',
      cover: path.join(config.fixturesPath, 'The_Beatles.jpeg'),
    },
    {
      name: 'Pink Floyd',
      about: 'Pink Floyd are an English rock band formed in London in 1965.',
      cover: path.join(config.fixturesPath, 'Pink_Floyd.jpeg'),
    },
  );

  const [album1, album2, album3] = await Album.create(
    {
      artist: artist1,
      title: 'Abbey Road',
      yearOfRelease: 1969,
      cover: path.join(config.fixturesPath, 'Beatles_-_Abbey_Road.jpg'),
    },
    {
      artist: artist1,
      title: 'Revolver',
      yearOfRelease: 1967,
      cover: path.join(config.fixturesPath, "Sgt.-Pepper's-Lonely-Hearts Club-Band.jpg"),
    },
    {
      artist: artist2,
      title: 'The Dark Side of the Moon',
      yearOfRelease: 1967,
      cover: path.join(config.fixturesPath, 'Dark_Side_of_the_Moon.jpeg'),
    },
  );

  const [track1, track2, track3] = await Track.create(
    {
      album: album1,
      title: 'Come Together',
      duration: '4:20',
      listing: 1,
    },
    {
      album: album2,
      title: 'Eleanor Rigby',
      duration: '3:03',
      listing: 2,
    },
    {
      album: album3,
      title: 'Money',
      duration: '6:22',
      listing: 3,
    },
  );

  const [user1, user2] = await User.create(
    {
      username: 'david',
      password: 'JrDZn3hgrC4V',
      token: randomUUID(),
    },
    {
      username: 'john',
      password: 'JrDZn3hgrC4V234',
      token: randomUUID(),
    },
  );

  await TrackHistory.create(
    {
      username: user1,
      track: track1,
      datetime: new Date().toISOString(),
    },
    {
      username: user1,
      track: track2,
      datetime: new Date().toISOString(),
    },
    {
      username: user2,
      track: track3,
      datetime: new Date().toISOString(),
    },
  );
};

void run();
