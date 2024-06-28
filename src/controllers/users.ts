import { Request, Response } from 'express';
import mongoose from 'mongoose';
import User from '../models/user';
import { SUCCESS_REQUEST, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, SERVER_ERROR_MESSAGE } from '../utils/constants';

export const createUser = (req: Request, res: Response) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
  .then(userData => res.status(SUCCESS_REQUEST).send(userData))
  .catch(err => {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.'})
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const getUsers = (req: Request, res: Response) => {
  User.find({})
  .then(usersData => res.status(SUCCESS_REQUEST).send(usersData))
  .catch(err => {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const getUserById = (req: Request, res: Response) => {
  const { id } = req.params;
  User.findById(id)
  .then(userData => {
    if (!userData) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь по указанному _id не найден.'})
    }
    res.status(SUCCESS_REQUEST).send({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      _id: userData._id
    })
  })
  .catch(err => {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const updateUserProfile = (req: Request, res: Response) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true })
  .then(user => {
    if (!user) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.'})
    }
    res.status(SUCCESS_REQUEST).send(user)})
  .catch(err => {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении профиля пользователя.'})
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const updateUserAvatar = (req: Request, res: Response) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true })
  .then(user => {
    if (!user) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найден.'})
    }
    res.status(SUCCESS_REQUEST).send(user)})
  .catch(err => {
    if (err instanceof mongoose.Error.ValidationError) {
      return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при обновлении аватара пользователя.'})
    }
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}