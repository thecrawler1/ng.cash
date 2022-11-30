import UnauthorizedError from '@core/errors/UnauthorizedError';

export default class TokenNotProvidedError extends UnauthorizedError {
  constructor() {
    super('Token not provided', 'TOKEN_NOT_PROVIDED');
  }
}
