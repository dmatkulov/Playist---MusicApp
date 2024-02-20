import path from 'path';

const rootPath = __dirname;

const config = {
  rootPath,
  publicPath: path.join(rootPath, 'public'),
  fixturesPath: path.join(rootPath, 'fixtures', 'images'),
  mongoose: {
    db: 'mongodb://localhost/playist',
  },
};
export default config;
