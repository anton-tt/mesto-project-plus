import { celebrate } from 'celebrate';
import Joi from 'joi';
import { URL_REGEX } from '../utils/constants';

export const signUpValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    about: Joi.string().min(2).max(200),
    avatar: Joi.string().pattern(URL_REGEX),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
});

export const signInValidator = celebrate({
  body: Joi.object().keys({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  })
});

export const getUserByIdValidator = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().length(24).hex().required()
  })
});

export const updateUserProfileValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(200).required()
  })
});

export const updateUserAvatarValidator = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().pattern(URL_REGEX).required()
  })
});