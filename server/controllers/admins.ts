import e, { NextFunction, Request, Response } from 'express';
import { Router } from 'express';
import authorize from '../middleware/authorize.js';
import authenticate from '../middleware/authenticate.js';
import User from '../models/User.js';
import Vendor from '../models/Vendor.js';
import Admin from '../models/Admin.js';

const adminController = Router()
  .delete(
    '/rmUser/:id',
    authenticate,
    authorize,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const remove = await User.removeUser((req as any).params.id);
        res.send(remove);
      } catch (err) {
        next(err);
      }
    }
  )

  .delete('/rmVendor/:id', authorize, async (req, res, next) => {
    try {
      const rmVendor = await Vendor.removeVendor(
        (req as any).params.id
      );
      res.send(rmVendor);
    } catch (err) {
      next(err);
    }
  })
  .post(
    '/addVendor',
    authorize,
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        console.log(req.body);
        const data = await Vendor.makeVendor(req.body.id);
        res.json(data);
      } catch (err) {
        next(err);
      }
    }
  )

  .get(
    '/isAdmin',
    [authenticate, authorize],
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const curUser = (req as any).user.id;
        const resp = await Admin.checkIfAdmin(curUser);
        if (resp.admin_id === curUser) {
          res.json(true);
        } else {
          res.json(false);
        }
      } catch (err) {
        next(err);
      }
    }
  );

export default adminController;
