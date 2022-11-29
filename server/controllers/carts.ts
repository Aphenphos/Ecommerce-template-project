import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import authenticate from '../middleware/authenticate.js';
import Cart from '../models/Cart.js';

const cartController = Router()
  .post(
    '/addToCart',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const toCart = await Cart.addTo({
          user_id: (req as any).user.id,
          ...req.body,
        });
        res.json(toCart);
      } catch (err) {
        next(err);
      }
    }
  )

  .get(
    '/getCart',
    authenticate,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const curUserId = (req as any).user.id;
        const cart = await Cart.getCartByUserId(curUserId);
        res.json(cart);
      } catch (err) {
        next(err);
      }
    }
  );

export default cartController;
