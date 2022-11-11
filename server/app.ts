import express, { type Request, type Response } from 'express';
import cors from 'cors';
import userController from './controllers/users.js';
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
app.all('*', (req: Request, res: Response) => {
  console.log(`404 for ${req.url}`);
  res
    .status(404)
    .send({ error: 404, message: `URL ${req.url} not found` });
});

export default server;
