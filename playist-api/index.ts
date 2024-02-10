import express from 'express';
import cors from 'cors';
import * as mongoose from 'mongoose';
import config from './config';

const app = express();
const port = 8000;

app.use(express.json());
app.use(cors());

const run = async () => {
  await mongoose.connect(config.mongoose.db);
  
  app.listen(port, () => {
    console.log('Server on port ' + port);
  });
  
  process.on('exit', () => {
    mongoose.disconnect();
  });
};

void run();