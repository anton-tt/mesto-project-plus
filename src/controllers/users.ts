import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import { SUCCESS_REQUEST, BAD_REQUEST, NOT_FOUND, INTERNAL_SERVER_ERROR, CONFLICT, SERVER_ERROR_MESSAGE,
  UNAUTHORIZED } from '../utils/constants';

export const createUser = (req: Request, res: Response ) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(SUCCESS_REQUEST).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    }))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        return res.status(BAD_REQUEST).send({ message: 'Переданы некорректные данные при создании пользователя.'})
      }
      if (err.code === 11000) {
        return res.status(CONFLICT).send({ message: 'Пользователь с такой электронной почтой уже существует.'})
      }
      return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
    });
}

export const login = (req: Request, res: Response ) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password')
    .then((user) => {
      if (!user || !user.password) {
        return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным email не найден.'})
      }
      bcrypt.compare(password, user.password)
      .then((matched) => {
        if (!matched) {
          return res.status(NOT_FOUND).send({ message: 'Неверный пароль.'})
        }
        const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
        res.send({ token });
      })
    })
    .catch(err => {
      return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
    });
}

export const getUsers = (req: Request, res: Response ) => {
  User.find({})
  .then(usersData => res.status(SUCCESS_REQUEST).send(usersData))
  .catch(err => {
    return res.status(INTERNAL_SERVER_ERROR).send({ message: SERVER_ERROR_MESSAGE })
  });
}

export const getCurrentUser = (req: Request, res: Response ) => {
  const id = req.user._id;
  if (!id) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  User.findById(id)
  .then(userData => {
    if (!userData) {
      return res.status(NOT_FOUND).send({ message: 'Пользователь с указанным _id не найденSSSS.'})
    }
    res.status(SUCCESS_REQUEST).send({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      email: userData.email,
      _id: userData.id
    })
  })
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
      email: userData.email,
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