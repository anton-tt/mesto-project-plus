import { FORBIDDEN } from '../utils/constants';

class ForbiddenError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = FORBIDDEN;
  }
}

export default ForbiddenError;