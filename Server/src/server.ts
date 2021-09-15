/** @format */

import express from 'express';
import connect from './database/connet';
import log from './logger';
import { deserializeUser } from './middleware';
import routes from './routes';
import obj from './service/variables';
var cors = require('cors');
const app = express();

app.use(deserializeUser);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
console.log('object');

app.listen(obj.port, () => {
  log.info(`Server is running on ${obj.host}:${obj.port} ...`);
  connect();
  routes(app);
});
