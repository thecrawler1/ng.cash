import GetUserBalanceService from '../../../../src/core/services/GetUserBalanceService';
import { expect } from 'chai';
import { account, user } from './mocks/data';
import MockGetAccountById from './mocks/MockGetAccountByIdRepository';

describe('Get user balance service', function () {
  const mockGetAccountById = new MockGetAccountById(account);
  const getUserBalanceService = new GetUserBalanceService(mockGetAccountById);

  it('should return the user balance', async function () {
    const result = await getUserBalanceService.perform(user);

    expect(result.value).to.be.equal(account.balance.value);
  });
});
