import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import Stripe from 'stripe';
import Item from '../models/Item.js';

const stripe = new Stripe(process.env.STRIPE_PRIVATE_KEY!, {
  apiVersion: '2022-11-15',
});

const stripeController = Router().post(
  '/checkout',
  authenticate,
  async (req: Request, res: Response, next: NextFunction) => {
    const lineItems = [];
    try {
      for (let i = 0; i < req.body.items.length; i++) {
        const itemData = await Item.getById(req.body.items[i].id);
        console.log(itemData);
        if (itemData === null) {
          throw new Error('Item does not exist');
        }
        lineItems.push({
          price_data: {
            currency: 'usd',
            product_data: {
              name: itemData!.item_name,
            },
            unit_amount: itemData!.item_price,
          },
          quantity: req.body.items[i].quantity,
        });
      }
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        mode: 'payment',
        line_items: lineItems,
        success_url: `${process.env.API_URL}:7891/success`,
        cancel_url: `${process.env.API_URL}:7891/cancel`,
      });
      res.json({ url: session.url });
    } catch (err) {
      next(err);
    }
  }
);

export default stripeController;
