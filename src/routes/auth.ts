import { Router } from 'express';
import { createUser, login } from '../controllers/users';
import { SIGNIN_ROUT, SIGHUP_ROUT } from '../utils/constants';

const authRouter = Router();

authRouter.post(SIGNIN_ROUT, login);
authRouter.post(SIGHUP_ROUT, createUser);

export default authRouter;