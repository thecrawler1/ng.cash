import InvalidPasswordTypeError from './errors/InvalidPasswordTypeError';
import InvalidPasswordLengthError from './errors/InvalidPasswordLengthError';
import PasswordMissingRequiredCharacterError from './errors/PasswordMissingRequiredCharacterError';

export default class Password {
  private static readonly MIN_LENGTH = 8;
  private static readonly MAX_LENGTH = 16;

  private constructor(private readonly _value: string) {}

  static create(value: string): Password {
    this.validateType(value);
    this.validateLength(value);
    this.validateRequiredCharacters(value);

    return new Password(value);
  }

  private static validateType(value: string): void {
    if (typeof value !== 'string') {
      throw new InvalidPasswordTypeError();
    }
  }

  private static validateLength(value: string): void {
    if (value.length < this.MIN_LENGTH || value.length > this.MAX_LENGTH) {
      throw new InvalidPasswordLengthError(this.MIN_LENGTH, this.MAX_LENGTH);
    }
  }

  private static validateRequiredCharacters(value: string): void {
    const hasDigit = value.match(/\d+/g);
    const hasCapitalLetter = value.match(/[A-Z]+/g);

    if (!hasDigit || !hasCapitalLetter) {
      throw new PasswordMissingRequiredCharacterError();
    }
  }

  get value(): string {
    return this._value;
  }
}
