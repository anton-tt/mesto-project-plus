import express from 'express';
import mongoose from 'mongoose';
import appRouter from './routes/index';
import { requestLogger } from './middlewares/logger';
import { errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';
import auth from './middlewares/auth';

const { PORT = 3000 } = process.env;
const app = express();

app.use(express.json());

mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(appRouter);
app.use(requestLogger);
app.use(errorLogger);
app.use(auth);
app.use(errorHandler);

app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})