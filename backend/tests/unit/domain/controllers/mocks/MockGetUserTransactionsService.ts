import Transaction from '../../../../../src/domain/entities/Transaction';
import User from '../../../../../src/domain/entities/User';
import IGetUserTransactionsService, { Filters } from '../../../../../src/domain/interfaces/services/IGetUserTransactionsService';

export default class MockGetUserTransactionsService implements IGetUserTransactionsService {
  constructor(public fakeTransactions: Transaction[]) {}

  async perform(_user: User, _filters: Filters): Promise<Transaction[]> {
    return this.fakeTransactions;
  }
}
