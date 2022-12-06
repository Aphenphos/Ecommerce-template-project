import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import ItemImage from '../models/ItemImages';
import cloudinary from '../services/Cloudinary';
const itemImageController = Router().post(
  '/uploadImage',
  async (req: Request, res: Response, next: NextFunction) => {
    const imgData = req.body;
    try {
      const result = await cloudinary.uploader.upload(imgData.file, {
        folder: 'item_images',
      });
      const toDB = await ItemImage.insert({
        item_id: imgData.item_id,
        image_url: result.secure_url,
      });
      res.json(toDB);
    } catch (err) {
      next(err);
    }
  }
);

export default itemImageController;
