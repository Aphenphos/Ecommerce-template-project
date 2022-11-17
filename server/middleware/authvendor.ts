import { NextFunction, Request, Response } from 'express';
import Vendor from '../models/Vendor.js';

const authVendor = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const check = await Vendor.checkIfVendor((req as any).user.id);
    if (check.vendor_id === (req as any).user.id) {
      next();
    } else {
      res.status(401).send({ message: 'failed to auth vendor' });
    }
  } catch (err: any) {
    err.status = 401;
    console.error(err);
    next(err);
  }
};

export default authVendor;
