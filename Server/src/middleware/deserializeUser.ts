/** @format */

import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';
import { reIssueAccessToken } from '../service/session.service';
import { decode } from '../utils/jwt.utils';

const deserializeUser = async (req: Request, res: Response, next: NextFunction) => {
  const accessToken = get(req, 'headers.authorization', '').replace(/^Bearer\s/, '');

  // Header names in Express are auto-converted to lowercase
  //let accessToken = req.headers['x-access-token'] || req.headers['authorization'];

  // Remove Bearer from string

  //accessToken = accessToken.replace(/^Bearer\s+/, '');
  //console.log({ req });
  const refreshToken = get(req, 'headers.xrefresh');
  //console.log({ accessToken });
  //console.log({ refreshToken });
  if (!accessToken) return next();

  //@ts-ignore
  const { decoded, expired } = decode(accessToken);
  console.log({ decoded });
  //console.log({ expired });

  if (decoded) {
    // @ts-ignore
    req.user = decoded;

    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      // Add the new access token to the response header
      res.setHeader('x-access-token', newAccessToken);

      const { decoded } = decode(newAccessToken);

      // @ts-ignore
      req.user = decoded;
    }

    return next();
  }

  return next();
};

export default deserializeUser;
