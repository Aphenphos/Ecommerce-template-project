import { NextFunction, Request, Response } from 'express';

const notFound = (req: Request, res: Response) => {
  console.error(`404 for ${req.url}`);
  res
    .status(404)
    .send({ error: 404, message: `URL ${req.url} not found` });
};

export default notFound;
