import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import authVendor from '../middleware/authvendor.js';
import authVendorItem from '../middleware/vendorItemAuth.js';
import Item from '../models/Item.js';
const itemController = Router()
  .post(
    '/addItem',
    [authenticate, authVendor],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body);
        const newItem = await Item.insert({
          vendor_id: (req as any).user.id,
          ...req.body,
        });
        res.json(newItem);
      } catch (err) {
        next(err);
      }
    }
  )

  .delete(
    '/rmItem/:id',
    [authenticate, authVendor, authVendorItem],
    async (req: Request, res: Response, next: NextFunction) => {}
  );

export default itemController;
