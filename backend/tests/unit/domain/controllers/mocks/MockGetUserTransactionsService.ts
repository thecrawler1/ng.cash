import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import IGetUserTransactionsService, { Filters } from '@domain/interfaces/services/IGetUserTransactionsService';

export default class MockGetUserTransactionsService implements IGetUserTransactionsService {
  constructor(public fakeTransactions: Transaction[]) {}

  async perform(_user: User, _filters: Filters): Promise<Transaction[]> {
    return this.fakeTransactions;
  }
}
