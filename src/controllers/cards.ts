import { Request, Response } from 'express';
import mongoose from 'mongoose';
import Card from '../models/card';
import { SUCCESS_REQUEST, BAD_REQUEST, INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE } from '../utils/constants';

export const createCard = (req: Request, res: Response) => {
  const { name, link } = req.body;
  const ownerId = req.user._id;
  return Card.create({ name, link, ownerId })
    .then(cardData => res.status(SUCCESS_REQUEST).send(cardData))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send({message: 'Для создания карточки переданы некорректные данные.'})
      }
      return res.status(INTERNAL_SERVER_ERROR).send({message: SERVER_ERROR_MESSAGE })
    });
}






/*export const createCar = (req, res) => Card.create({
  email: req.body.email,
  password: req.body.password,
})
  .then((user) => res.send(user))
  .catch((err) => res.status(400).send(err));*/