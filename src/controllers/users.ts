import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/card';
import { SUCCESS_REQUEST, BAD_REQUEST, INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE } from '../utils/constants';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  return User.create({ name, about, avatar })
    .then(userData => res.status(SUCCESS_REQUEST).send(userData))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send({message: 'Для создания пользователя переданы некорректные данные.'})
      }
      return res.status(INTERNAL_SERVER_ERROR).send({message: SERVER_ERROR_MESSAGE })
    });
}
