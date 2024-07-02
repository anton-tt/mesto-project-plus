import { Router } from 'express';
import { getUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser } from '../controllers/users';
import auth from '../middlewares/auth';

const userRouter = Router();

userRouter.get('/', auth, getUsers);
userRouter.get('/me', auth, getCurrentUser);
userRouter.get('/:userId', auth, getUserById);
userRouter.patch('/me', auth, updateUserProfile);
userRouter.patch('/me/avatar', auth, updateUserAvatar);

export default userRouter;