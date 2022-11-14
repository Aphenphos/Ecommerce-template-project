import { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import Admin from '../models/Admin.js';

const adminController = Router()
  .delete(
    '/removeUser',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const remove = await Admin.removeUser(
          req.body.email,
          req.body.id
        );
        res.send(remove);
      } catch (err) {
        next(err);
      }
    }
  )

  .post(
    '/addVendor',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const data = await Admin.makeVendor(req.body.id);
        res.json(data);
      } catch (err) {
        next(err);
      }
    }
  );
