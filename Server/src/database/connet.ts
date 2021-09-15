/** @format */

import mongoose from 'mongoose';
import log from '../logger';
import obj from '../service/variables';

const dbUri: string = obj.mongoUrl;

function connect() {
  return mongoose
    .connect(dbUri)
    .then(() => {
      log.info('Database connected');
    })
    .catch((error) => {
      log.error('db error', error);
      process.exit(1);
    });
}

export default connect;
