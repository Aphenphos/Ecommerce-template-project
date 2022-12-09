import { NextFunction, Request, Response } from 'express';
import Admin from '../models/Admin.js';

const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await Admin.checkIfAdmin((req as any).user.id);
    if (check === null) {
      return null;
    }
    if (check.admin_id === (req as any).user.id) {
      next();
    } else {
      res.status(401).send({ message: 'failed to authorize' });
    }
  } catch (err: any) {
    err.status = 401;
    console.error(err);
    next(err);
  }
};

export default authorize;
