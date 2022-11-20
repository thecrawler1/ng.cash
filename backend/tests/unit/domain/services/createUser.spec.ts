import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import CreateUserService from '../../../../src/domain/services/CreateUserService';
import MockCheckIfUsernameIsBeingUsedRepository from './mocks/MockCheckIfUsernameIsBeingUsedRepository';
import MockCreateUserAndAccountRepository from './mocks/MockCreateUserAndAccountRepository';
import MockHashGenerator from './mocks/MockHashGenerator';
import UsernameIsBeingUsedError from '../../../../src/domain/services/errors/UsernameIsBeingUsedError';
import { user } from './mocks/data';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Create user service', function () {
  const mockCreateUserAndAccount = new MockCreateUserAndAccountRepository(user);
  const mockCheckIfUsernameIsBeingUsed = new MockCheckIfUsernameIsBeingUsedRepository(false);
  const mockHashGenerator = new MockHashGenerator();

  const createUserService = new CreateUserService(
    mockCreateUserAndAccount,
    mockCheckIfUsernameIsBeingUsed,
    mockHashGenerator,
  );

  it('should create an user', async function () {
    const result = await createUserService.perform(user.username, user.password!);

    expect(result.toDTO()).to.be.deep.equal(user.toDTO());
  });

  it('should thrown an error when the username is being used', async function () {
    mockCheckIfUsernameIsBeingUsed.result = true;

    await expect(createUserService.perform(user.username, user.password!))
      .to.eventually.be.rejectedWith(UsernameIsBeingUsedError)
      .and.contain({ messageCode: 'USERNAME_IS_BEING_USED' });
  });
});
