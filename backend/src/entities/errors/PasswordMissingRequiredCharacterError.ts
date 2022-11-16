import BadRequestError from '../../errors/BadRequestError';

export default class PasswordMissingRequiredCharacterError extends BadRequestError {
  constructor() {
    super(
      'The password must be a number and a capital letter',
      'PASSWORD_MISSING_REQUIRED_CHARACTER',
    );

    this.name = 'PasswordMissingRequiredCharacterError';
  }
}
