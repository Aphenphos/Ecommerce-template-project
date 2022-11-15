import { NextFunction, Response } from 'express';
import Admin from '../models/Admin';

const authorizeAdmin = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = (req as any).body.id;
    if (id === null || id === undefined)
      res.status(401).send({ message: 'Failed to Authorize' });
    const check = await Admin.checkIfAdmin(id);
    console.log(check);
  } catch (err: any) {
    err.status = 401;
    console.error(err);
    next(err);
  }
};

export default authorizeAdmin;
