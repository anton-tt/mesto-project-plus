import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import { SUCCESS_REQUEST, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE } from '../utils/constants';

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  return Card.create({ name, link, ownerId })
    .then(cardData => res.status(SUCCESS_REQUEST).send(cardData))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send({ message: 'Пользователь с таким email уже существует.'})
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
    });
}

export const getCards = (req: Request, res: Response) => {
  Card.find({})
  .then(cardsData => res.status(SUCCESS_REQUEST).send(cardsData))
  .catch(err => {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const deleteCardById = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndDelete(cardId)
  .then(card => {
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка по указанному _id не найдена.'})
    }
    res.status(SUCCESS_REQUEST).send({ message: 'Карточка удалена.'})
  })
  .catch(err => {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const likeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $addToSet: {likes: req.user._id} }, { new: true })
  .then(card => {
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка по указанному _id не найдена.'})
    }
    res.status(SUCCESS_REQUEST).send({ message: 'Лайк карточке поставлен.'})
  })
  .catch(err => {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для постановки лайка.'})
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const dislikeCard = (req: Request, res: Response) => {
  const { cardId } = req.params;
  Card.findByIdAndUpdate(cardId, { $pull: {likes: req.user._id} }, { new: true })
  .then(card => {
    if (!card) {
      return res.status(NOT_FOUND).send({ message: 'Карточка по указанному _id не найдена.'})
    }
    res.status(SUCCESS_REQUEST).send({ message: 'Лайк карточке снят.'})
  })
  .catch(err => {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные для снятия лайка.'})
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}