import { NextFunction, Request, Response, Router } from 'express';
import authenticate from '../middleware/authenticate.js';
import UserService from '../services/UserService.js';

const ONEHOURINMS = 1000 * 60 * 60;

const userController = Router()
  .post(
    '/',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const user = await UserService.create(req.body);
        const sessionToken = await UserService.signIn(req.body);
        const cName = process.env.COOKIE_NAME;
        const sC = process.env.SECURE_COOKIES;
        if (cName === undefined || sC === undefined)
          throw new Error('Failed to process ');
        res
          .cookie(cName, sessionToken, {
            httpOnly: true,
            secure: sC === 'true',
            sameSite: sC === 'true' ? 'none' : 'strict',
            maxAge: ONEHOURINMS,
          })
          .json(req.body);
        res.json(user);
      } catch (err) {
        next(err);
      }
    }
  )

  .post(
    '/sessions',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        const {
          email,
          password,
        }: { email: string; password: string } = req.body;
        const sessionToken = await UserService.signIn({
          email,
          password,
        });
        const cName = process.env.COOKIE_NAME;
        const sC = process.env.SECURE_COOKIES;
        if (cName === undefined || sC === undefined)
          throw new Error('Failed to process ');
        res
          .cookie(cName, sessionToken, {
            httpOnly: true,
            secure: sC === 'true',
            sameSite: sC === 'true' ? 'none' : 'strict',
            maxAge: ONEHOURINMS,
          })
          .json(req.body);
      } catch (err) {
        next(err);
      }
    }
  )

  .get(
    '/me',
    async (req: Request, res: Response, next: NextFunction) => {
      try {
        await authenticate(req, next);
        res.json((req as any).user);
      } catch (err) {
        next(err);
      }
    }
  );

export default userController;
