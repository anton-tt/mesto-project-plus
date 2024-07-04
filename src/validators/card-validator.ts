import { celebrate } from 'celebrate';
import Joi from 'joi';
import { URL_REGEX } from '../utils/constants';

export const createCardValidator = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    link: Joi.string().pattern(URL_REGEX)
  })
});

export const cardIdValidator = celebrate({
  params: Joi.object().keys({
    id: Joi.string().length(24).hex().required()
  })
});