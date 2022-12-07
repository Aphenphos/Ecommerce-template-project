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
import stripeController from './controllers/stripe.js';
import cartController from './controllers/carts.js';
import itemImageController from './controllers/itemImages.js';

export default (): Router => {
  const prefixRouter = express.Router();
  prefixRouter.use('/users', userController);
  prefixRouter.use('/admins', adminController);
  prefixRouter.use('/items', itemController);
  prefixRouter.use('/stripe', stripeController);
  prefixRouter.use('/carts', cartController);
  prefixRouter.use('/itemImages', itemImageController);

  return prefixRouter;
};
