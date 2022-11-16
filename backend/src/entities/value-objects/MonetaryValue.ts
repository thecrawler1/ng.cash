import InvalidMonetaryValueTypeError from '../errors/InvalidMonetaryValueTypeError';
import InvalidNegativeMonetaryValueError from '../errors/InvalidNegativeMonetaryValueError';

export default class MonetaryValue {
  private constructor(private readonly _value: number) {}

  static create(value: number): MonetaryValue {
    this.validateType(value);
    this.validateSign(value);

    return new MonetaryValue(value);
  }

  private static validateType(value: number): void {
    if (typeof value !== 'number' || Number.isNaN(value)) {
      throw new InvalidMonetaryValueTypeError();
    }
  }

  private static validateSign(value: number): void {
    if (value < 0) {
      throw new InvalidNegativeMonetaryValueError();
    }
  }

  get value(): number {
    return this._value;
  }
}
