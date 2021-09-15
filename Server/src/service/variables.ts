/** @format */

import * as dotenv from 'dotenv';
dotenv.config();
const runPort: any = process.env.PORT;
const hostUrl: any = process.env.APP_HOST;
const mongoUrl: any = process.env.MONGO;

let obj: {
  port: number;
  host: string;
  mongoUrl: string;
};

export default obj = {
  port: runPort,
  host: hostUrl,
  mongoUrl,
};
