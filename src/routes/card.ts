import { Router } from 'express';
import { createCard, getCards, deleteCardById, likeCard, dislikeCard } from '../controllers/cards';
import auth from '../middlewares/auth';

const cardRouter = Router();

cardRouter.post('/', auth, createCard);
cardRouter.get('/', auth, getCards);
cardRouter.delete('/:cardId', auth, deleteCardById);
cardRouter.put('/:cardId/likes', auth, likeCard);
cardRouter.delete('/:cardId/likes', auth, dislikeCard);

export default cardRouter;