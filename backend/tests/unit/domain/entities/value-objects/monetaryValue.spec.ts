import { expect } from 'chai';
import InvalidMonetaryValueTypeError from '../../../../../src/domain/entities/value-objects/monetary-value/errors/InvalidMonetaryValueTypeError';
import InvalidNegativeMonetaryValueError from '../../../../../src/domain/entities/value-objects/monetary-value/errors/InvalidNegativeMonetaryValueError';
import MonetaryValue from '../../../../../src/domain/entities/value-objects/monetary-value';

describe('MonetaryValue value object', function () {
  it('should create a MonetaryValue', function () {
    const id = MonetaryValue.create(5);

    expect(id.value).to.be.equal(5);
  });

  it('should throw an error when the type is not number', function () {
    const createMonetaryValue = () => MonetaryValue.create('5' as any);

    expect(createMonetaryValue).to.throw(InvalidMonetaryValueTypeError).and.contain({
      messageCode: 'INVALID_MONETARY_VALUE_TYPE',
    });
  });

  it('should throw an error when the value is negative', function () {
    const createMonetaryValue = () => MonetaryValue.create(-5);

    expect(createMonetaryValue).to.throw(InvalidNegativeMonetaryValueError).and.contain({
      messageCode: 'INVALID_NEGATIVE_MONETARY_VALUE',
    });
  });
});
