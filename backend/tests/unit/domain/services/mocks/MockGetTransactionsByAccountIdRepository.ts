import Transaction from '../../../../../src/domain/entities/Transaction';
import Id from '../../../../../src/domain/entities/value-objects/id';
import { Filters } from '../../../../../src/domain/interfaces/services/IGetUserTransactionsService';
import IGetTransactionsByAccountIdRepository from '../../../../../src/domain/interfaces/repositories/IGetTransactionsByAccountIdRepository';

export default class MockGetTransactionsByAccountIdRepository implements IGetTransactionsByAccountIdRepository {
  constructor(public fakeTransactions: Transaction[]) {}

  async perform(_accountId: Id, _filters: Filters): Promise<Transaction[]> {
    return this.fakeTransactions;
  }
}
