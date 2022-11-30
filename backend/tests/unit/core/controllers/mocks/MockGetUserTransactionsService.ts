import Transaction from '../../../../../src/core/entities/Transaction';
import User from '../../../../../src/core/entities/User';
import IGetUserTransactionsService, { Filters } from '../../../../../src/core/interfaces/services/IGetUserTransactionsService';

export default class MockGetUserTransactionsService implements IGetUserTransactionsService {
  constructor(public fakeTransactions: Transaction[]) {}

  async perform(_user: User, _filters: Filters): Promise<Transaction[]> {
    return this.fakeTransactions;
  }
}
