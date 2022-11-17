import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import User from '@domain/entities/User';
import LoginService from '@domain/services/LoginService';
import MockGetUserByUsernameRepository from './mocks/MockGetUserByUsernameRepository';
import MockGetUserPasswordHashByUsernameRepository from './mocks/MockGetUserPasswordHashByUsernameRespository';
import MockHashComparer from './mocks/MockHashComparer';
import MockJwtUserEncoder from './mocks/MockJwtUserEncoder';
import InvalidCredentialsError from '@domain/services/errors/InvalidCredentialsError';
import { user } from './mocks/data';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Login service', function () {
  const mockGetUserPasswordHashByUsername = new MockGetUserPasswordHashByUsernameRepository();
  const mockGetUserByUsername = new MockGetUserByUsernameRepository(user);
  const mockHashComparer = new MockHashComparer(true);
  const mockJwtUserEncoder = new MockJwtUserEncoder();

  const loginService = new LoginService(
    mockGetUserPasswordHashByUsername,
    mockGetUserByUsername,
    mockHashComparer,
    mockJwtUserEncoder,
  );

  it('should return a token', async function () {
    const result = await loginService.perform(user.username, user.password!);

    expect(result).to.be.deep.equal({ token: mockJwtUserEncoder.fakeToken });
  });

  it('should throw an error when the password is incorrect', async function () {
    mockHashComparer.result = false;

    await expect(loginService.perform(user.username, user.password!))
      .to.eventually.be.rejectedWith(InvalidCredentialsError)
      .and.contain({ messageCode: 'INVALID_CREDENTIALS' });
  });
});
