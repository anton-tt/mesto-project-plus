import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import BadRequestError from '../errors/bad-request';
import ForbiddenError from '../errors/forbidden';
import NotFoundError from '../errors/not-found';
import { SUCCESS_REQUEST, CREATED } from '../utils/constants';

export const createCard = (req: Request, res: Response, next: NextFunction) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  return Card.create({ name, link, owner: ownerId })
    .then(cardData => res.status(CREATED).send(cardData))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные карточки.'));
      } else {
        next(err);
      }
    });
}

export const getCards = (req: Request, res: Response, next: NextFunction) => {
  Card.find({})
  .then(cardsData => res.status(SUCCESS_REQUEST).send(cardsData))
  .catch(next);
}

export const deleteCardById = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  const userId = req.user._id;
  Card.findByIdAndDelete(cardId).orFail()
  .then(card => {
    if (card.owner?.toString() !== userId) {
      throw new ForbiddenError('Карточку может удалить только её владелец.')
    }
    res.status(SUCCESS_REQUEST).send({ message: 'Карточка удалена.'})
  })
  .catch(err => {
    if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Карточка по указанному _id не найдена.'));
    } else {
      next(err);
    }
  });
}

export const likeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: {likes: req.user._id} }, { new: true }).orFail()
  .then(card => {
    res.status(SUCCESS_REQUEST).send({ message: 'Лайк карточке поставлен.'})
  })
  .catch(err => {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка по указанному _id не найдена.'));
    } else if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные для постановки лайка.'))
    } else {
      next(err);
    }
  });
}

export const dislikeCard = (req: Request, res: Response, next: NextFunction) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: {likes: req.user._id} }, { new: true }).orFail()
  .then(card => {
    res.status(SUCCESS_REQUEST).send({ message: 'Лайк карточке снят.'})
  })
  .catch(err => {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Карточка по указанному _id не найдена.'));
    } else if (err instanceof mongoose.Error.CastError) {
      next(new BadRequestError('Переданы некорректные данные для снятия лайка.'))
    } else {
      next(err);
    }
  });
}