import InvalidIdTypeError from '../errors/InvalidIdTypeError';
import InvalidNegativeIdError from '../errors/InvalidNegativeIdError';

export default class Id {
  private constructor(private readonly _value: number) {}

  static create(value: number): Id {
    this.validateType(value);
    this.validateSign(value);

    return new Id(value);
  }

  private static validateType(value: number): void {
    if (typeof value !== 'number' || !Number.isInteger(value)) {
      throw new InvalidIdTypeError();
    }
  }

  private static validateSign(value: number): void {
    if (value < 0) {
      throw new InvalidNegativeIdError();
    }
  }

  get value(): number {
    return this._value;
  }
}
