import { model, Schema } from 'mongoose';
import { IUser } from '../utils/types';
import { DEFAULT_USER_NAME, DEFAULT_USER_ABOUT, DEFAULT_USER_AVATAR } from '../utils/constants';

const userSchema = new Schema<IUser>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
    default: DEFAULT_USER_NAME
  },
  about: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 200,
    default: DEFAULT_USER_ABOUT
  },
  avatar: {
    type: String,
    required: true,
    default: DEFAULT_USER_AVATAR
  }
});

export default model<IUser>('user', userSchema);