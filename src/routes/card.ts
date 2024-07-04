import { Router } from 'express';
import { createCard, getCards, deleteCardById, likeCard, dislikeCard } from '../controllers/cards';
import auth from '../middlewares/auth';
import { createCardValidator, cardIdValidator } from '../validators/card-validator';

const cardRouter = Router();

cardRouter.post('/', auth, createCardValidator, createCard);
cardRouter.get('/', auth, getCards);
cardRouter.delete('/:cardId', auth, cardIdValidator, deleteCardById);
cardRouter.put('/:cardId/likes', auth, cardIdValidator, likeCard);
cardRouter.delete('/:cardId/likes', auth, cardIdValidator, dislikeCard);

export default cardRouter;