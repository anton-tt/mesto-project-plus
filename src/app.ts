import express, { Request, Response, NextFunction } from 'express';
import mongoose from 'mongoose';
import appRouter from './routes/index';
import cardRouter from './routes/card';
import authRouter from './routes/auth';
import unknownRouter from './routes/auth';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

/*app.use((req: Request, res: Response, next: NextFunction) => {
  req.user = {
    _id: '667eec94eeee65b24b6bccda' // вставьте сюда _id созданного в предыдущем пункте пользователя
  };

  next();
});*/

app.use(appRouter);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})