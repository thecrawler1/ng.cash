import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';

import MakeTransferService from '@domain/services/MakeTransferService';
import { account, transaction, user } from './mocks/data';
import MockGetAccountById from './mocks/MockGetAccountByIdRepository';
import MockGetUserByUsernameRepository from './mocks/MockGetUserByUsernameRepository';
import MockMakeTransferRepository from './mocks/MockMakeTransferRepository';
import User from '@domain/entities/User';
import InvalidTransferToYourselfError from '@domain/services/errors/InvalidTransferToYourselfError';
import Account from '@domain/entities/Account';
import InsufficientBalanceError from '@domain/services/errors/InsufficientBalanceError';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Make transfer service', function () {
  const destinationUser = User.create({ id: 2, accountId: 2, username: 'destinationUser' });

  const mockGetUserByUsername = new MockGetUserByUsernameRepository(destinationUser);
  const mockGetAccountById = new MockGetAccountById(account);
  const mockMakeTransfer = new MockMakeTransferRepository(transaction);

  const makeTransferService = new MakeTransferService(
    mockGetUserByUsername,
    mockGetAccountById,
    mockMakeTransfer,
  );

  it('should make a transfer', async function () {
    const result = await makeTransferService.perform(user, destinationUser.username, transaction.value);

    expect(result.toDTO()).to.be.deep.equal(transaction.toDTO());
  });

  it('should thrown an error when the source and destination user are the same', async function () {
    mockGetUserByUsername.fakeUser = user;

    await expect(makeTransferService.perform(user, user.username, transaction.value))
      .to.eventually.be.rejectedWith(InvalidTransferToYourselfError)
      .and.contain({ messageCode: 'INVALID_TRANSFER_TO_YOURSELF' });
  });

  it('should thrown an error then the user not have sufficient balance', async function () {
    const accountWithoutBalance = Account.create({ id: 1, balance: 0 });
    mockGetAccountById.fakeAccount = accountWithoutBalance;
    mockGetUserByUsername.fakeUser = destinationUser;

    await expect(makeTransferService.perform(user, user.username, transaction.value))
      .to.eventually.be.rejectedWith(InsufficientBalanceError)
      .and.contain({ messageCode: 'INSUFFICIENT_BALANCE' });
  });
});
