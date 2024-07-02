import { Router, Request, Response } from 'express';
import userRouter from './user';
import cardRouter from './card';
import authRouter from './auth';
import { USERS_ROUT, CARDS_ROUT, NOT_FOUND } from '../utils/constants';

const appRouter = Router();
appRouter.use(USERS_ROUT, userRouter);
appRouter.use(CARDS_ROUT, cardRouter);

appRouter.use(authRouter);

appRouter.use('*', (req: Request, res: Response) => {
  return res.status(NOT_FOUND).send({ message: "Неизвестный адрес." })
});

export default appRouter;