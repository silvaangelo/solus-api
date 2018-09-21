import * as mongoose from 'mongoose'
import { mongo_url, mongo_database } from './config'

const options = {
  server: {
    socketOptions: {
      keepAlive: 1
    }
  },
  autoIndex: true,
  dbName: mongo_database
};

mongoose.connect(mongo_url, options);
