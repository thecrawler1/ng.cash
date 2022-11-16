import { expect } from 'chai';
import Username from '../../../../src/entities/value-objects/Username';
import InvalidUsernameTypeError from '../../../../src/entities/errors/InvalidUsernameTypeError';
import InvalidUsernameLengthError from '../../../../src/entities/errors/InvalidUsernameLengthError';

describe('Username value object', function () {
  it('should create an username', function () {
    const username = Username.create('example');

    expect(username.value).to.be.equals('example');
  });

  it('should remove whitespaces from both ends', function () {
    const username = Username.create('   example   ');

    expect(username.value).to.be.equals('example');
  });

  it('should throw an error when the type is not a string', function () {
    const createUsername = () => Username.create(5 as any);

    expect(createUsername).to.throw(InvalidUsernameTypeError).and.contain({
      messageCode: 'INVALID_USERNAME_TYPE',
    });
  });

  it('should throw an error when the length is less than 3', function () {
    const createUsername = () => Username.create('ab');

    expect(createUsername).to.throw(InvalidUsernameLengthError).and.contain({
      messageCode: 'INVALID_USERNAME_LENGTH',
    });
  });

  it('should throw an error when the length is less than 3 after remove whitespaces', function () {
    const createUsername = () => Username.create('   ab   ');

    expect(createUsername).to.throw(InvalidUsernameLengthError).and.contain({
      messageCode: 'INVALID_USERNAME_LENGTH',
    });
  });

  it('should throw an error when the length is greater than 32', function () {
    let value = '';
    for (let i = 0; i < 33; i++) value += 'c';

    const createUsername = () => Username.create(value);

    expect(createUsername).to.throw(InvalidUsernameLengthError).and.contain({
      messageCode: 'INVALID_USERNAME_LENGTH',
    });
  });
});
