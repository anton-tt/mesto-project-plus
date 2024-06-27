import { Router } from 'express';
import { createUser } from '../controllers/users';
import { USERS_ROUT } from '../utils/constants';

const userRouter = Router();

userRouter.post(USERS_ROUT, createUser);

export default userRouter;
