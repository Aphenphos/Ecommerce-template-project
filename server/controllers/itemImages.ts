import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import ItemImage from '../models/ItemImages.js';
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'node:fs';
import authenticate from '../middleware/authenticate.js';
import authVendor from '../middleware/authvendor.js';
//Store raw images in cloudinary rather than on server
//Save link to image in the DB for BLAZING speeds.
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUIDINARY_KEY,
  api_secret: process.env.CLOUDINARY_SECRET,
  secure: true,
});
const upload = multer({ dest: 'tmp/' });

const itemImageController = Router()
  .post(
    '/uploadImage/:itemId',
    [authenticate, authVendor],
    //use multer to save BLOB locally temporarily as we send it up to cloudinary
    upload.single('imgForm'),
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const imgData = req.file!.path;
        const itemId = parseInt(req.params.itemId!);
        const result = await cloudinary.uploader.upload(imgData, {
          folder: 'item_images',
        });
        //the temp file is then deleted immediately after successful upload and we save some information in the DB
        fs.unlinkSync(`${imgData}`);
        const toDB = await ItemImage.insert({
          item_id: itemId,
          image_url: result.secure_url,
          cloud_id: result.public_id,
        });
        res.json(toDB);
      } catch (err) {
        next(err);
      }
    }
  )
  .delete(
    '/rmImage/:image_url',
    [authenticate, authVendor],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const image_url = decodeURIComponent(req.params.image_url!);
        if (!image_url) {
          throw new Error('Not Found');
        }
        //grabs the rest of the image info by the URL
        const imgObj = await ItemImage.getBySecureUrl(image_url!);
        await cloudinary.uploader.destroy((await imgObj).cloud_id);
        //removes it from the cloud using the clouds publicID (only way they allow)
        const rmImg = ItemImage.deleteByCloudId(
          (await imgObj).cloud_id
        );
        //deletes from the database
        res.json(rmImg);
      } catch (err) {
        next(err);
      }
    }
  );

export default itemImageController;
