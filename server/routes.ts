/*******************************************************************************
 * Routes here belong to the API. All routes here assume API_PREFIX. In local
 * development, this is assumed to be /api/v1. See the Webpack configuration
 * (webpack.config.js) for the re-writes to accomplish that.
 *
 * Since API_PREFIX adds the /api/v1, you needn't do it here in your routes.
 ******************************************************************************/

import express, { type Router } from 'express';
import userController from './controllers/users.js';
import adminController from './controllers/admins.js';
import itemController from './controllers/items.js';

export default (): Router => {
  const prefixRouter = express.Router();
  prefixRouter.use('/users', userController);
  prefixRouter.use('/admins', adminController);
  prefixRouter.use('/items', itemController);

  return prefixRouter;
};