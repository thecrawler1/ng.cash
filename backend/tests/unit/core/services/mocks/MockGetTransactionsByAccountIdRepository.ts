import Transaction from '../../../../../src/core/entities/Transaction';
import Id from '../../../../../src/core/entities/value-objects/id';
import { Filters } from '../../../../../src/core/interfaces/services/IGetUserTransactionsService';
import IGetTransactionsByAccountIdRepository from '../../../../../src/core/interfaces/repositories/IGetTransactionsByAccountIdRepository';

export default class MockGetTransactionsByAccountIdRepository implements IGetTransactionsByAccountIdRepository {
  constructor(public fakeTransactions: Transaction[]) {}

  async perform(_accountId: Id, _filters: Filters): Promise<Transaction[]> {
    return this.fakeTransactions;
  }
}
