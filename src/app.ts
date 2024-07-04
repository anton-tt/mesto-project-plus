import express from 'express';
import mongoose from 'mongoose';
import helmet from 'express';
import { errors } from 'celebrate';
import appRouter from './routes/index';
import { requestLogger } from './middlewares/logger';
import { errorLogger } from './middlewares/logger';
import errorHandler from './middlewares/error-handler';

const { PORT = 3000 } = process.env;
const app = express();
app.use(express.json());
mongoose.connect('mongodb://127.0.0.1:27017/mestodb');

app.use(requestLogger);
app.use(appRouter);
app.use(errorLogger);
app.use(errors);
app.use(errorHandler);
app.use(helmet);
app.listen(PORT, () => {
  // Если всё работает, консоль покажет, какой порт приложение слушает
  console.log(`App listening on port ${PORT}`)
})