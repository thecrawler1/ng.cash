import Transaction from '@domain/entities/Transaction';
import Id from '@domain/entities/value-objects/id';
import { Filters } from '@domain/interfaces/services/IGetUserTransactionsService';
import IGetTransactionsByAccountIdRepository from '@domain/interfaces/repositories/IGetTransactionsByAccountIdRepository';

export default class MockGetTransactionsByAccountIdRepository implements IGetTransactionsByAccountIdRepository {
  constructor(public fakeTransactions: Transaction[]) {}

  async perform(_accountId: Id, _filters: Filters): Promise<Transaction[]> {
    return this.fakeTransactions;
  }
}
