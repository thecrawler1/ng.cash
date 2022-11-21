import UnauthorizedError from '@domain/errors/UnauthorizedError';

export default class InvalidTokenError extends UnauthorizedError {
  constructor(message: string) {
    super(message, 'INVALID_TOKEN');
  }
}
