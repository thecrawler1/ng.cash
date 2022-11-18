import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import IGetTransactionsByAccountIdRepository from '@domain/interfaces/repositories/IGetTransactionsByAccountIdRepository';
import IGetUserTransactionsService, { Filters } from '@domain/interfaces/services/IGetUserTransactionsService';

export default class GetUserTransactionsService implements IGetUserTransactionsService {
  constructor(private getTransactionsByAccountId: IGetTransactionsByAccountIdRepository) {}

  async perform(user: User, filters: Filters): Promise<Transaction[]> {
    return this.getTransactionsByAccountId.perform(user.accountId, filters);
  }
}
