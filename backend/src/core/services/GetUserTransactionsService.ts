import Transaction from '@core/entities/Transaction';
import User from '@core/entities/User';
import IGetTransactionsByAccountIdRepository from '@core/interfaces/repositories/IGetTransactionsByAccountIdRepository';
import IGetUserTransactionsService, { Filters } from '@core/interfaces/services/IGetUserTransactionsService';

export default class GetUserTransactionsService implements IGetUserTransactionsService {
  constructor(private getTransactionsByAccountId: IGetTransactionsByAccountIdRepository) {}

  async perform(user: User, filters: Filters): Promise<Transaction[]> {
    return this.getTransactionsByAccountId.perform(user.accountId, filters);
  }
}
