import { Router, Request, Response, NextFunction } from 'express';
import userRouter from './user';
import cardRouter from './card';
import authRouter from './auth';
import NotFoundError from '../errors/not-found';
import { USERS_ROUT, CARDS_ROUT } from '../utils/constants';

const appRouter = Router();
appRouter.use(USERS_ROUT, userRouter);
appRouter.use(CARDS_ROUT, cardRouter);

appRouter.use(authRouter);

appRouter.use('*', (req: Request, res: Response, next: NextFunction) => {
  next(new NotFoundError('Маршрут не найден'));
});

export default appRouter;