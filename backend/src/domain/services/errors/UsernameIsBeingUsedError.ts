import BadRequestError from '@domain/errors/BadRequestError';

export default class UsernameIsBeingUsedError extends BadRequestError {
  constructor() {
    super('The username is already being used', 'USERNAME_IS_BEING_USED');

    this.name = 'UsernameIsBeingUsedError';
  }
}
