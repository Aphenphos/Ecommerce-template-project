import { NextFunction, Request, Response } from 'express';
import Item from '../models/Item.js';

const authVendorItem = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const itemId = await Item.getById((req as any).params.id);
    if (!itemId) {
      res.status(401).send({ message: 'item not found' });
    }
    const personId = (req as any).user.id;
    if ((itemId as any).id === personId) {
      next();
    }
  } catch (err: any) {
    err.status = 401;
    console.error(err);
    next(err);
  }
};

export default authVendorItem;
