import { Router } from 'express';
import { createCard } from '../controllers/cards';
import { CARDS_ROUT } from '../utils/constants';

const cardRouter = Router();

cardRouter.post(CARDS_ROUT, createCard);

export default cardRouter;