import { Router } from 'express';
import { getUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser } from '../controllers/users';
import { USERS_ROUT } from '../utils/constants';
import auth from '../middlewares/auth';

const userRouter = Router();

userRouter.get(`${USERS_ROUT}`, auth, getUsers);
userRouter.get(`${USERS_ROUT}/:userId/`, getUserById);
userRouter.get(`${USERS_ROUT}/me/`, auth, getCurrentUser);
userRouter.patch(`${USERS_ROUT}/me/`, auth, updateUserProfile);
userRouter.patch(`${USERS_ROUT}/me/avatar/`, auth, updateUserAvatar);

export default userRouter;