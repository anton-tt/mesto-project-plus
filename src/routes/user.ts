import { Router } from 'express';
import { createUser, getUsers } from '../controllers/users';
import { USERS_ROUT } from '../utils/constants';

const userRouter = Router();

userRouter.post(USERS_ROUT, createUser);
userRouter.get(USERS_ROUT, getUsers);
userRouter.get(`${USERS_ROUT}/:userId`, getUsers);

export default userRouter;