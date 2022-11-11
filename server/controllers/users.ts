import { Router } from 'express';
const userController = Router().get('/', (req, res) => {
  res.json('yo');
});

export default userController;
