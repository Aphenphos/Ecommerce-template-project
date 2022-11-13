import express, { type Request, type Response } from 'express';
import cors from 'cors';
import userController from './controllers/users.js';
import notFound from './middleware/not-found.js';

const app = express();
app.use(express.json());

const server = app.listen(
  parseInt(process.env.APP_PORT || '7890'),
  () => {
    console.log('Started server on ', server.address());
  }
);
app.use(
  cors({
    origin: 'http://localhost:7891',
    credentials: true,
  })
);

//Routes
app.use('/users', userController);

//Middleware
app.use('*', notFound);
export default server;
