import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
//perhaps narrow this from any to exactly what I want it to return later.
interface AuthRequest {
  user: any;
  cookies: any;
}

const authenticate = async (
  req: AuthRequest,
  res: Response,
  next: NextFunction
) => {
  try {
    const c = process.env.COOKIE_NAME;
    const s = process.env.SECRET;
    if (c === undefined || s === undefined) {
      throw new Error('Failed to Authenticate');
    }
    const cookies = req.cookies && req.cookies[c];

    const user = jwt.verify(cookies, s);
    req.user = user;

    next();
  } catch (err: any) {
    err.status = 401;
    next(err);
  }
};

export default authenticate;
