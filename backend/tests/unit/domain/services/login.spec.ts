import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import LoginService from '../../../../src/domain/services/LoginService';
import MockGetUserByUsernameRepository from './mocks/MockGetUserByUsernameRepository';
import MockGetUserPasswordHashByUsernameRepository from './mocks/MockGetUserPasswordHashByUsernameRespository';
import MockHashComparer from './mocks/MockHashComparer';
import MockUserTokenEncoder from './mocks/MockUserTokenEncoder';
import InvalidCredentialsError from '../../../../src/domain/services/errors/InvalidCredentialsError';
import { user } from './mocks/data';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Login service', function () {
  const mockGetUserPasswordHashByUsername = new MockGetUserPasswordHashByUsernameRepository();
  const mockGetUserByUsername = new MockGetUserByUsernameRepository(user);
  const mockHashComparer = new MockHashComparer(true);
  const mockUserTokenEncoder = new MockUserTokenEncoder();

  const loginService = new LoginService(
    mockGetUserPasswordHashByUsername,
    mockGetUserByUsername,
    mockHashComparer,
    mockUserTokenEncoder,
  );

  it('should return a token', async function () {
    const result = await loginService.perform(user.username, user.password!);

    expect(result).to.be.deep.equal({ token: mockUserTokenEncoder.fakeToken });
  });

  it('should throw an error when the password is incorrect', async function () {
    mockHashComparer.result = false;

    await expect(loginService.perform(user.username, user.password!))
      .to.eventually.be.rejectedWith(InvalidCredentialsError)
      .and.contain({ messageCode: 'INVALID_CREDENTIALS' });
  });
});
