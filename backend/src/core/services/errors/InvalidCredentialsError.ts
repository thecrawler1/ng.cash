import UnauthorizedError from '@core/errors/UnauthorizedError';

export default class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Incorrect username or password', 'INVALID_CREDENTIALS');
  }
}
