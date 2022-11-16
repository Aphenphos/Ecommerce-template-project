import { NextFunction, Request, Response } from 'express';
import Admin from '../models/Admin.js';

const authorize = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await Admin.checkIfAdmin((req as any).user.id);
    console.log('----Authorize-----', check);
  } catch (err: any) {
    err.status = 401;
    console.error(err);
    next(err);
  }
};

export default authorize;
