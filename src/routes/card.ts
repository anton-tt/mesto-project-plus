import { Router } from 'express';
import { createCard, getCards, deleteCardById } from '../controllers/cards';
import { CARDS_ROUT } from '../utils/constants';

const cardRouter = Router();

cardRouter.post(CARDS_ROUT, createCard);
cardRouter.get(CARDS_ROUT, getCards);
cardRouter.delete(`${CARDS_ROUT}/:cardId`, deleteCardById);

export default cardRouter;