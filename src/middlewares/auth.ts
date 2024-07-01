import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { UNAUTHORIZED } from '../utils/constants';

export default (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers;
  //console.log(req.headers);
  if (!authorization || !authorization.startsWith('Bearer ')) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }

  const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
    (req as any).user = payload;

  } catch (err) {
    return res.status(UNAUTHORIZED).send({ message: 'Необходима авторизация' });
  }
  next(); // пропускаем запрос дальше
};