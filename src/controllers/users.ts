import { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/user';
import BadRequestError from '../errors/bad-request';
import ConflictError from '../errors/conflict';
import NotFoundError from '../errors/not-found';
import UnauthorizedError from '../errors/unauthorized';
import { SUCCESS_REQUEST, CREATED } from '../utils/constants';

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash: string) => User.create({ name, about, avatar, email, password: hash }))
    .then(user => res.status(CREATED).send({
      _id: user._id,
      name: user.name,
      about: user.about,
      avatar: user.avatar,
      email: user.email
    }))
    .catch(err => {
      if (err instanceof mongoose.Error.ValidationError) {
        next(new BadRequestError('Переданы некорректные данные при создании пользователя.'));
      } else if (err.code === 11000) {
        next(new ConflictError('Пользователь с такой электронной почтой уже существует.'));
      } else {
        next(err);
      }
    });
}

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  User.findOne({ email }).select('+password').orFail(new UnauthorizedError('Неизвестная электронная почта.'))
    .then((user) => {
      bcrypt.compare(password, user.password)
    .then((matched) => {
      if (!matched) {
        return next(new UnauthorizedError('Неверный пароль.'))
      }
      const token = jwt.sign({ _id: user._id }, 'some-secret-key', { expiresIn: '7d' });
      res.send({ token });
      })
    })
    .catch(err => {
      if (err instanceof mongoose.Error.CastError) {
        next(new UnauthorizedError('Неизвестная электронная почта или неверный пароль.'));
      } else {
        next(err);
      }
    });
}

export const getCurrentUser = (req: Request, res: Response, next: NextFunction) => {
  const id = req.user._id;
  User.findById(id).orFail()
  .then(userData => {
    res.status(SUCCESS_REQUEST).send({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      email: userData.email,
      _id: userData.id
    })
  })
  .catch(err => {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь с указанным _id не найден.'));
    } else {
      next(err);
    }
  });
}

export const getUserById = (req: Request, res: Response, next: NextFunction) => {
  const { userId } = req.params;
  User.findById(userId).orFail()
  .then(userData => {
    res.status(SUCCESS_REQUEST).send({
      name: userData.name,
      about: userData.about,
      avatar: userData.avatar,
      email: userData.email,
      _id: userData._id
    })
  })
  .catch(err => {
    if (err instanceof mongoose.Error.CastError) {
      next(new NotFoundError('Пользователь с указанным _id не найден.'));
    } else {
      next(err);
    }
  });
}

export const getUsers = (req: Request, res: Response, next: NextFunction) => {
  User.find({})
  .then(usersData => res.status(SUCCESS_REQUEST).send(usersData))
  .catch(next);
}

export const updateUserProfile = (req: Request, res: Response, next: NextFunction) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user._id, { name, about }, { new: true, runValidators: true }).orFail()
  .then(user => {
    res.status(SUCCESS_REQUEST).send(user)})
  .catch(err => {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь с указанным _id не найден.'));
    } else if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при обновлении профиля пользователя.'))
    } else {
      next(err);
    }
  });
}

export const updateUserAvatar = (req: Request, res: Response, next: NextFunction) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(req.user._id, { avatar }, { new: true, runValidators: true }).orFail()
  .then(user => {
    res.status(SUCCESS_REQUEST).send(user)})
  .catch(err => {
    if (err instanceof mongoose.Error.DocumentNotFoundError) {
      next(new NotFoundError('Пользователь с указанным _id не найден.'));
    } else if (err instanceof mongoose.Error.ValidationError) {
      next(new BadRequestError('Переданы некорректные данные при обновлении аватара пользователя.'))
    } else {
      next(err);
    }
  });
}