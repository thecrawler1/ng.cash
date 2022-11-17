import { expect } from 'chai';
import InvalidPasswordLengthError from '@domain/entities/value-objects/password/errors/InvalidPasswordLengthError';
import InvalidPasswordTypeError from '@domain/entities/value-objects/password/errors/InvalidPasswordTypeError';
import PasswordMissingRequiredCharacterError from '@domain/entities/value-objects/password/errors/PasswordMissingRequiredCharacterError';
import Password from '@domain/entities/value-objects/password';

describe('Password value object', function () {
  it('should create a password', function () {
    const password = Password.create('Abc12345');

    expect(password.value).to.be.equal('Abc12345');
  });

  it('should throw an error when the password is not a string', function () {
    const createPassword = () => Password.create(5 as any);

    expect(createPassword).to.throw(InvalidPasswordTypeError).and.contain({
      messageCode: 'INVALID_PASSWORD_TYPE',
    });
  });

  it('should throw an error when the password length is less than 8', function () {
    const createPassword = () => Password.create('Abc1234');

    expect(createPassword).to.throw(InvalidPasswordLengthError).and.contain({
      messageCode: 'INVALID_PASSWORD_LENGTH',
    });
  });

  it('should throw an error when the password length is greater than 16', function () {
    let password = 'A';
    for (let i = 0; i < 16; i++) password += '1';

    const createPassword = () => Password.create(password);

    expect(createPassword).to.throw(InvalidPasswordLengthError).and.contain({
      messageCode: 'INVALID_PASSWORD_LENGTH',
    });
  });

  it('should throw an error when the password not contain a number', function () {
    const createPassword = () => Password.create('Abcdefgh');

    expect(createPassword).to.throw(PasswordMissingRequiredCharacterError).and.contain({
      messageCode: 'PASSWORD_MISSING_REQUIRED_CHARACTER',
    });
  });

  it('should throw an error when the password not contain a capital letter', function () {
    const createPassword = () => Password.create('abc12345');

    expect(createPassword).to.throw(PasswordMissingRequiredCharacterError).and.contain({
      messageCode: 'PASSWORD_MISSING_REQUIRED_CHARACTER',
    });
  });
});
