/** @format */

import jwt from 'jsonwebtoken';
// TO DO
// It has to include from from .env file
const privateKey: string = 'XYZ';

export function sign(object: Object, options?: jwt.SignOptions | undefined) {
  //console.log({ options });
  return jwt.sign(object, privateKey, options);
}

export function decode(token: string) {
  try {
    const decoded = jwt.verify(token, privateKey);

    return { valid: true, expired: false, decoded };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: null,
    };
  }
}
