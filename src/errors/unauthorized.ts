import { UNAUTHORIZED } from '../utils/constants';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = UNAUTHORIZED;
  }
}

export default UnauthorizedError;