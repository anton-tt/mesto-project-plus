import { Types, model, Schema } from 'mongoose';
import validator from 'validator';
import { ICard } from '../utils/types';

const cardSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true,
    validate: {
      validator: (v: string) => validator.isURL(v),
      message: 'Некорректный URL фото.'
    }
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
    required: true
  },
  likes: {
    type: [{type: Types.ObjectId}],
    ref: 'user',
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model<ICard>('card', cardSchema);