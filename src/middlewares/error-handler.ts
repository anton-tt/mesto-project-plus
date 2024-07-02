import { ErrorRequestHandler } from 'express';
import { INTERNAL_SERVER_ERROR } from '../utils/constants';

const errorHandler: ErrorRequestHandler = (err, req, res, next): void => {
  const { statusCode = INTERNAL_SERVER_ERROR, message } = err;
  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
};

export default errorHandler;