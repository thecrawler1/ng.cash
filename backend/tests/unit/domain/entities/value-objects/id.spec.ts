import { expect } from 'chai';
import InvalidIdTypeError from '../../../../../src/domain/entities/value-objects/id/errors/InvalidIdTypeError';
import InvalidNegativeIdError from '../../../../../src/domain/entities/value-objects/id/errors/InvalidNegativeIdError';
import Id from '../../../../../src/domain/entities/value-objects/id';

describe('Id value object', function () {
  it('should create an id', function () {
    const id = Id.create(5);

    expect(id.value).to.be.equal(5);
  });

  it('should throw an error when the type is not number', function () {
    const createId = () => Id.create('5' as any);

    expect(createId).to.throw(InvalidIdTypeError).and.contain({ messageCode: 'INVALID_ID_TYPE' });
  });

  it('should throw an error when the value is negative', function () {
    const createId = () => Id.create(-5);

    expect(createId).to.throw(InvalidNegativeIdError).and.contain({
      messageCode: 'INVALID_NEGATIVE_ID',
    });
  });
});
