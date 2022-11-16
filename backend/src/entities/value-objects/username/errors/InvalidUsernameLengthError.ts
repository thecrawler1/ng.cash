import BadRequestError from '../../../../errors/BadRequestError';

export default class InvalidUsernameLengthError extends BadRequestError {
  constructor(minLength: number, maxLength: number) {
    super(
      `The username length must be between ${minLength} and ${maxLength}`,
      'INVALID_USERNAME_LENGTH',
    );

    this.name = 'InvalidUsernameLengthError';
  }
}
