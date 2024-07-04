import { Router } from 'express';
import { getUsers, getUserById, updateUserProfile, updateUserAvatar, getCurrentUser } from '../controllers/users';
import auth from '../middlewares/auth';
import { getUserByIdValidator, updateUserProfileValidator, updateUserAvatarValidator } from '../validators/user-validator';

const userRouter = Router();

userRouter.get('/', auth, getUsers);
userRouter.get('/me', auth, getUserByIdValidator, getCurrentUser);
userRouter.get('/:userId', auth, getUserById);
userRouter.patch('/me', auth, updateUserProfileValidator, updateUserProfile);
userRouter.patch('/me/avatar', auth, updateUserAvatarValidator, updateUserAvatar);

export default userRouter;