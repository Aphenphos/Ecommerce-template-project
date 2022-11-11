import { Router } from 'express';
import UserService from '../services/UserService';

const userController = Router().post('/', async (req, res, next) => {
  try {
    const user = await UserService.create(req.body);
    res.json(user);
  } catch (e) {
    next(e);
  }
});

export default userController;
