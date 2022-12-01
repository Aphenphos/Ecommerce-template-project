import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import authVendor from '../middleware/authvendor.js';
import authVendorItem from '../middleware/vendorItemAuth.js';
import Cart from '../models/Cart.js';
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
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const itemId = (req as any).params.id;
        const rmFromCarts = await Cart.removedFromStore(itemId);
        const rmItem = await Item.delete(itemId);
        res.send(rmItem);
      } catch (err) {
        next(err);
      }
    }
  )
  .put(
    '/upItem/:id',
    [authenticate, authVendor, authVendorItem],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('------ in controller');
        const upItem = await Item.updateById(
          (req as any).params.id,
          req.body
        );
        res.json(upItem);
      } catch (err) {
        next(err);
      }
    }
  )

  .get(
    '/getAll',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log('fetching all items');
        const allItems = await Item.getAll();
        res.json(allItems);
      } catch (err) {
        next(err);
      }
    }
  )

  .post(
    '/getByArr',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const arrToGet = req.body;
        const arrOfItems = await Item.getManyById(arrToGet);
        return res.json(arrOfItems);
      } catch (err) {
        next(err);
      }
    }
  )

  .get(
    '/getByVendor',
    [authenticate, authVendor],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const vendor_id = await (req as any).user.id;
        const arrOfItems = await Item.getAllByVendorId(vendor_id);
        return res.json(arrOfItems);
      } catch (err) {
        next(err);
      }
    }
  );

export default itemController;
