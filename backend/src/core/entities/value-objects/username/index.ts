import InvalidUsernameTypeError from './errors/InvalidUsernameTypeError';
import InvalidUsernameLengthError from './errors/InvalidUsernameLengthError';

export default class Username {
  private static readonly MIN_LENGTH = 3;
  private static readonly MAX_LENGTH = 32;

  private constructor(private readonly _value: string) {}

  static create(value: string): Username {
    this.validateType(value);
    this.validateLength(value.trim());

    return new Username(value.trim());
  }

  private static validateType(value: string): void {
    if (typeof value !== 'string') {
      throw new InvalidUsernameTypeError();
    }
  }

  private static validateLength(value: string): void {
    if (value.length < this.MIN_LENGTH || value.length > this.MAX_LENGTH) {
      throw new InvalidUsernameLengthError(this.MIN_LENGTH, this.MAX_LENGTH);
    }
  }

  get value(): string {
    return this._value;
  }
}
