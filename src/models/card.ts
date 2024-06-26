import { Types, model, Schema } from 'mongoose';
import { ICard } from '../utils/types';

const userSchema = new Schema<ICard>({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30
  },
  link: {
    type: String,
    required: true
  },
  owner: {
    type: Types.ObjectId,
    required: true
  },
  likes: {
    type: [{type: Types.ObjectId}],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export default model<ICard>('user', userSchema);