import { model, Schema } from 'mongoose';
import validator from 'validator';
import { IUser } from '../utils/types';
import { DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR } from '../utils/constants';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_NAME
  },
  about: {
    type: String,
    minlength: 2,
    maxlength: 200,
    default: DEFAULT_USER_ABOUT
  },
  avatar: {
    type: String,
    default: DEFAULT_USER_AVATAR,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: 'Некорректный URL аватара.'
    }
  },
  email: {
    type: String,
    unique: true,
    required: true,
    validate: {
      validator: (v: string) => validator.isEmail(v),
      message: 'Некорректный адрес электронной почты.'
    }
  },
  password: {
    type: String,
    required: true,
    select: false
  }
});

export default model<IUser>('user', userSchema);