import NotFoundError from '@domain/errors/NotFoundError';

export default class UserNotFoundError extends NotFoundError {
  constructor() {
    super('User not found', 'USER_NOT_FOUND');
  }
}
