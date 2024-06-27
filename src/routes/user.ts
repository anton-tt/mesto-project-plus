import { Router } from 'express';
import { createUser, getUsers, getUserById, updateUserProfile, updateUserAvatar } from '../controllers/users';
import { USERS_ROUT } from '../utils/constants';

const userRouter = Router();

userRouter.post(USERS_ROUT, createUser);
userRouter.get(USERS_ROUT, getUsers);
userRouter.get(`${USERS_ROUT}/:userId`, getUserById);
userRouter.patch(`${USERS_ROUT}/me`, updateUserProfile);
userRouter.patch(`${USERS_ROUT}/me/avatar`, updateUserAvatar);

export default userRouter;