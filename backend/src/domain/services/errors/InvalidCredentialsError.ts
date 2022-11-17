import UnauthorizedError from '@domain/errors/UnauthorizedError';

export default class InvalidCredentialsError extends UnauthorizedError {
  constructor() {
    super('Incorrect username or password', 'INVALID_CREDENTIALS');
  }
}
