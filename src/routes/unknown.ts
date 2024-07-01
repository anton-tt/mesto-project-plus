import { Router, Request, Response } from 'express';
import { NOT_FOUND } from '../utils/constants';

const unknownRouter = Router();

unknownRouter.all('*', (req: Request, res: Response) => {
  return res.status(NOT_FOUND).send({ message: "Неизвестный адрес." })
});