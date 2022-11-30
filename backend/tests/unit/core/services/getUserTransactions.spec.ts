import MockGetTransactionsByAccountIdRepository from './mocks/MockGetTransactionsByAccountIdRepository';
import { transaction, user } from './mocks/data';
import GetUserTransactionsService from '../../../../src/core/services/GetUserTransactionsService';
import { Filters, TransactionType } from '../../../../src/core/interfaces/services/IGetUserTransactionsService';
import { expect } from 'chai';

describe('Get user transactions service', function () {
  const mockGetTransactionsByAccountId = new MockGetTransactionsByAccountIdRepository([transaction]);
  const getUserTransactionsService = new GetUserTransactionsService(mockGetTransactionsByAccountId);
  const filters: Filters = { transactionType: TransactionType.both };

  it('should returns the transactions', async function () {
    const result = await getUserTransactionsService.perform(user, filters);

    expect(result).to.be.deep.equal([transaction]);
  });
});
