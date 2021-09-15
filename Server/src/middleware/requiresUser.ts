/** @format */

import { NextFunction, Request, Response } from 'express';
import { get } from 'lodash';

const requiresUser = async (req: Request, res: Response, next: NextFunction) => {
  ///console.log({ req });
  const user = get(req, 'user');

  console.log({ user });

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};

export default requiresUser;
