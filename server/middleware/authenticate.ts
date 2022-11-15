import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';
//perhaps narrow this type from any to exactly what I want it to return later.

const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const c = process.env.COOKIE_NAME;
    const s = process.env.JWT_SECRET;
    if (c === undefined || s === undefined) {
      throw new Error('Failed to Authenticate');
    }

    const cookies = req.cookies && req.cookies[c];
    console.log(cookies);
    if (!cookies) throw new Error('Failed to Authenticate Cookies');

    const user = jwt.verify(cookies, s);
    (req as any).user = user;

    next();
  } catch (err: any) {
    err.status = 401;
    next(err);
  }
};

export default authenticate;
