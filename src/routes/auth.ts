import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import { SIGNIN_ROUT, SIGNUP_ROUT } from '../utils/constants';
import { signUpValidator, signInValidator } from '../validators/user-validator';

const authRouter = Router();

authRouter.post(SIGNIN_ROUT, signInValidator, login);
authRouter.post(SIGNUP_ROUT, signUpValidator, createUser);

export default authRouter;