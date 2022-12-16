import { Router } from 'express';
import { NextFunction, Request, Response } from 'express';
import authenticate from '../middleware/authenticate.js';
import Cart from '../models/Cart.js';

const cartController = Router()
  .post(
    '/addToCart',
    authenticate,
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
  .put(
    '/upCart/:id',
    [authenticate],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        if (!req.params.id || Number.isNaN(req.params.id)) {
          throw new Error('Failed to update quantity');
        }
        const cartId = parseInt(req.params.id!);
        const userId = (req as any).user.id;
        const quant = req.body.quant;
        const update = await Cart.updateQuantity(
          cartId,
          quant,
          userId
        );
        res.json(update);
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
  )

  .delete(
    '/rmItem/:id',
    [authenticate],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const userId = (req as any).user.id;
        const itemId = (req as any).params.id;
        const rmItem = await Cart.removeFrom(itemId, userId);
        res.send(rmItem);
      } catch (err) {
        next(err);
      }
    }
  );

export default cartController;
