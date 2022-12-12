import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import authVendor from '../middleware/authvendor.js';
import authVendorItem from '../middleware/vendorItemAuth.js';
import Cart from '../models/Cart.js';
import Item from '../models/Item.js';
import ItemImage from '../models/ItemImages.js';
import { v2 as cloudinary } from 'cloudinary';
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUIDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});

const itemController = Router()
  .post(
    '/addItem',
    [authenticate, authVendor],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
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
        //remove the images
        const itemId = (req as any).params.id;
        const allImages = await ItemImage.getByItemId(itemId);
        if (allImages) {
          for (let i = 0; i < allImages!.length; i++) {
            await cloudinary.uploader.destroy(allImages[i]!.cloud_id);
          }
          await ItemImage.deleteByItemId(itemId);
        }
        //remove from users carts
        await Cart.removedFromStore(itemId);
        //remove from the database
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
        const allItems = await Item.getAll();
        res.json(allItems);
      } catch (err) {
        next(err);
      }
    }
  )
  .get(
    '/getById/:id',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const id = parseInt(req.params.id!);
        const itemDetails = await Item.getById(id);
        if (!itemDetails || !id) {
          throw new Error('Failed to find item');
        }
        res.json(itemDetails);
      } catch (err) {
        next(err);
      }
    }
  )
  .get(
    '/getBySearch/:search',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        let items;
        const searchParams = req.params.search;
        console.log(searchParams);
        if (
          searchParams === undefined ||
          searchParams === null ||
          searchParams === 'noSearch'
        ) {
          console.log('hit');
          items = await Item.getAll();
        } else {
          items = await Item.getBySearch(searchParams!);
        }
        console.log(items);
        if (items) {
          res.json(items);
        } else {
          res.json([]);
        }
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
