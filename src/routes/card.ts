import { Router } from 'express';
import { createCard, getCards, deleteCardById, likeCard, dislikeCard } from '../controllers/cards';
import { CARDS_ROUT } from '../utils/constants';
import auth from '../middlewares/auth';

const cardRouter = Router();

cardRouter.post(CARDS_ROUT, auth, createCard);
cardRouter.get(CARDS_ROUT, auth, getCards);
cardRouter.delete(`${CARDS_ROUT}/:cardId`, auth, deleteCardById);
cardRouter.put(`${CARDS_ROUT}/:cardId/likes`, auth, likeCard);
cardRouter.delete(`${CARDS_ROUT}/:cardId/likes`, auth, dislikeCard);

export default cardRouter;