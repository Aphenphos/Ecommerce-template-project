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
      throw new Error('Failed to ENV');
    }

    const cookies = req.cookies && req.cookies[c];
    if (cookies) {
      const user = jwt.verify(cookies, s);
      (req as any).user = user;
      next();
    } else {
      console.log('---------------', req.cookies);
      res.status(401).send({ message: 'failed to authenticate' });
    }
  } catch (err: any) {
    err.status = 401;
    console.error(err);
    next(err);
  }
};

export default authenticate;
