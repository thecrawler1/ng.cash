import BadRequestError from '../../errors/BadRequestError';

export default class InvalidPasswordLengthError extends BadRequestError {
  constructor(minLength: number, maxLength: number) {
    super(
      `The password length must be between ${minLength} and ${maxLength}`,
      'INVALID_PASSWORD_LENGTH',
    );

    this.name = 'InvalidPasswordLengthError';
  }
}
