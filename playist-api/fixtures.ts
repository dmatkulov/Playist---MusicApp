import mongoose from 'mongoose';
import config from './config';
import Artist from './models/Artist';
import Album from './models/Album';
import Track from './models/Track';
import User from './models/User';
import { randomUUID } from 'node:crypto';
import TrackHistory from './models/TrackHistory';

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

  const models = [TrackHistory, Track, Album, Artist, User];

  for (const model of models) {
    await dropCollection(db, model.collection.collectionName);
  }

  const [user1, user2] = await User.create(
    {
      username: 'user',
      password: 'user',
      token: randomUUID(),
      role: 'user',
    },
    {
      username: 'user2',
      password: 'user2',
      token: randomUUID(),
      role: 'user',
    },
    {
      username: 'admin',
      password: 'admin',
      token: randomUUID(),
      role: 'admin',
    },
  );

  const [artist1, artist2, artist3] = await Artist.create(
    {
      user: user1,
      name: 'The Beatles',
      about: 'The Beatles were an English rock band formed in Liverpool in 1960.',
      cover: 'fixtures/The_Beatles.jpeg',
      isPublished: true,
    },
    {
      user: user1,
      name: 'Pink Floyd',
      about: 'Pink Floyd are an English rock band formed in London in 1965.',
      cover: 'fixtures/Pink_Floyd.jpeg',
      isPublished: true,
    },
    {
      user: user2,
      name: 'Guns N’ Roses',
      about:
        "Guns N' Roses is an American hard rock band from Los Angeles, California, formed in March 1985 when local bands Hollywood Rose and L.A. Guns merged.",
      cover: 'fixtures/guns-and-roses.jpg',
      isPublished: false,
    },
  );

  const [album1, album2, album3, album4, album5] = await Album.create(
    {
      user: user1,
      artist: artist1,
      title: 'Abbey Road',
      yearOfRelease: 1969,
      cover: 'fixtures/Beatles_-_Abbey_Road.jpg',
      isPublished: false,
    },
    {
      user: user1,
      artist: artist1,
      title: 'Revolver',
      yearOfRelease: 1967,
      cover: 'fixtures/Sgt.-Peppers-Lonely-Hearts Club-Band.jpg',
      isPublished: true,
    },
    {
      user: user1,
      artist: artist2,
      title: 'The Dark Side of the Moon',
      yearOfRelease: 1967,
      cover: 'fixtures/Dark_Side_of_the_Moon.jpeg',
      isPublished: true,
    },
    {
      user: user1,
      artist: artist2,
      title: 'Wish You Were Here',
      yearOfRelease: 1975,
      cover: 'fixtures/WishYouWereHere.jpg',
      isPublished: true,
    },
    {
      user: user2,
      artist: artist3,
      title: 'Use Your Illusion I',
      yearOfRelease: 1991,
      cover: 'fixtures/GnR--UseYourIllusion1.jpg',
      isPublished: false,
    },
  );

  const [track1, track2, track3, track4, track5] = await Track.create(
    {
      user: user1,
      album: album1,
      title: 'Come Together',
      duration: '4:20',
      listing: 1,
      isPublished: true,
    },
    {
      user: user1,
      album: album1,
      title: 'Oh! Darling',
      duration: '3:27',
      listing: 2,
      isPublished: true,
    },
    {
      user: user1,
      album: album1,
      title: 'Here Comes the Sun',
      duration: '3:06',
      listing: 3,
      isPublished: true,
    },
    {
      user: user1,
      album: album1,
      title: 'Something',
      duration: '3:03',
      listing: 4,
      isPublished: true,
    },
    {
      user: user1,
      album: album1,
      title: 'Because',
      duration: '2:46',
      listing: 5,
      isPublished: true,
    },
    {
      user: user1,
      album: album2,
      title: 'Taxman',
      duration: '2:41',
      listing: 1,
      isPublished: true,
    },
    {
      user: user1,
      album: album2,
      title: 'Love You To',
      duration: '3:10',
      listing: 2,
      isPublished: true,
    },
    {
      user: user1,
      album: album2,
      title: 'Eleanor Rigby',
      duration: '2:06',
      listing: 3,
      isPublished: true,
    },
    {
      user: user1,
      album: album2,
      title: 'Here, There and Everywhere',
      duration: '2:26',
      listing: 4,
      isPublished: true,
    },
    {
      user: user1,
      album: album2,
      title: "I'm Only Sleeping",
      duration: '3:02',
      listing: 5,
      isPublished: true,
    },
    {
      user: user1,
      album: album3,
      title: 'Speak to Me',
      duration: '1:30',
      listing: 1,
      isPublished: false,
    },
    {
      user: user1,
      album: album3,
      title: 'Breathe',
      duration: '2:43',
      listing: 2,
      isPublished: false,
    },
    {
      user: user1,
      album: album3,
      title: 'On the Run',
      duration: '3:30',
      listing: 3,
      isPublished: true,
    },
    {
      user: user1,
      album: album3,
      title: 'Time',
      duration: '7:06',
      listing: 4,
      isPublished: true,
    },
    {
      user: user1,
      album: album3,
      title: 'The Great Gig in the Sky',
      duration: '4:47',
      listing: 5,
      isPublished: true,
    },
    {
      user: user1,
      album: album4,
      title: 'Shine On You Crazy Diamond (Parts I-V)',
      duration: '13:32',
      listing: 1,
      isPublished: true,
    },
    {
      user: user1,
      album: album4,
      title: 'Welcome to the Machine',
      duration: '7:30',
      listing: 2,
      isPublished: true,
    },
    {
      user: user1,
      album: album4,
      title: 'Have a Cigar',
      duration: '5:08',
      listing: 3,
      isPublished: true,
    },
    {
      user: user1,
      album: album4,
      title: 'Wish You Were Here',
      duration: '5:40',
      listing: 4,
      isPublished: true,
    },
    {
      user: user1,
      album: album4,
      title: 'Shine On You Crazy Diamond (Parts VI-IX)',
      duration: '12:29',
      listing: 5,
      isPublished: true,
    },
    {
      user: user2,
      album: album5,
      title: 'November Rain',
      duration: '8:57',
      listing: 1,
      isPublished: false,
    },
    {
      user: user2,
      album: album5,
      title: "Don't Cry",
      duration: '4:44',
      listing: 2,
      isPublished: false,
    },
    {
      user: user2,
      album: album5,
      title: 'Live and Let Die',
      duration: '2:58',
      listing: 3,
      isPublished: false,
    },
    {
      user: user2,
      album: album5,
      title: "Knocking on Heaven's Door",
      duration: '5:36',
      listing: 4,
      isPublished: false,
    },
    {
      user: user2,
      album: album5,
      title: 'Civil War',
      duration: '7:36',
      listing: 5,
      isPublished: false,
    },
    {
      user: user2,
      album: album5,
      title: 'Estranged',
      duration: '9:23',
      listing: 6,
      isPublished: false,
    },
  );

  await TrackHistory.create(
    {
      username: user1,
      track: track1,
      datetime: new Date().toISOString(),
      artist: artist1,
    },
    {
      username: user1,
      track: track2,
      datetime: new Date().toISOString(),
      artist: artist1,
    },
    {
      username: user1,
      track: track3,
      datetime: new Date().toISOString(),
      artist: artist1,
    },
    {
      username: user2,
      track: track4,
      datetime: new Date().toISOString(),
      artist: artist1,
    },
    {
      username: user2,
      track: track5,
      datetime: new Date().toISOString(),
      artist: artist1,
    },
  );

  await db.close();
};

void run();
