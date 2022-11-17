import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import User from '@domain/entities/User';
import LoginService from '@domain/services/LoginService';
import MockGetUserByUsernameRepository from './mocks/MockGetUserByUsernameRepository';
import MockGetUserPasswordHashByUsernameRepository from './mocks/MockGetUserPasswordHashByUsernameRespository';
import MockHashComparer from './mocks/MockHashComparer';
import MockJwtUserEncoder from './mocks/MockJwtUserEncoder';
import InvalidCredentialsError from '@domain/services/errors/InvalidCredentialsError';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Login service', function () {
  const fakeUser = User.create({
    id: 1,
    accountId: 1,
    username: 'username',
    password: 'Abc12345',
  });

  const mockGetUserPasswordHashByUsername = new MockGetUserPasswordHashByUsernameRepository();
  const mockGetUserByUsername = new MockGetUserByUsernameRepository(fakeUser);
  const mockHashComparer = new MockHashComparer(true);
  const mockJwtUserEncoder = new MockJwtUserEncoder();

  const loginService = new LoginService(
    mockGetUserPasswordHashByUsername,
    mockGetUserByUsername,
    mockHashComparer,
    mockJwtUserEncoder,
  );

  it('should return a token', async function () {
    const result = await loginService.perform(fakeUser.username, fakeUser.password!);

    expect(result).to.be.deep.equal({ token: mockJwtUserEncoder.fakeToken });
  });

  it('should throw an error when the password is incorrect', async function () {
    mockHashComparer.result = false;

    await expect(loginService.perform(fakeUser.username, fakeUser.password!))
      .to.eventually.be.rejectedWith(InvalidCredentialsError)
      .and.contain({ messageCode: 'INVALID_CREDENTIALS' });
  });
});
