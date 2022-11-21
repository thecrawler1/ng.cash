import Transaction from '@domain/entities/Transaction';
import Id from '@domain/entities/value-objects/id';
import IGetTransactionsByAccountIdRepository from '@domain/interfaces/repositories/IGetTransactionsByAccountIdRepository';
import { Filters, TransactionType } from '@domain/interfaces/services/IGetUserTransactionsService';
import AccountModel from './database/models/Account';
import TransactionModel from './database/models/Transaction';
import AccountNotFoundError from './errors/AccountNotFoundError';

export default class GetTransactionByAccountIdRepository implements IGetTransactionsByAccountIdRepository {
  async perform(accountId: Id, filters: Filters): Promise<Transaction[]> {
    const accountModel: AccountModel = await this.getAccountModel(accountId);

    const transactionModels: TransactionModel[] = [
      ...accountModel.debitedTransactions,
      ...accountModel.creditedTransactions,
    ];

    const allTransactions = transactionModels.map((t) => Transaction.create(t.toJSON()));
    const filteredTransactions = this.filterTransactions(allTransactions, accountId, filters);

    return this.sortTransactionsByDate(filteredTransactions);
  }

  private async getAccountModel(accountId: Id): Promise<AccountModel> {
    const accountModel: AccountModel | null = await AccountModel.findOne({
      where: { id: accountId.value },
      include: [
        { model: TransactionModel, as: 'debitedTransactions' },
        { model: TransactionModel, as: 'creditedTransactions' },
      ],
    });

    if (!accountModel) throw new AccountNotFoundError();

    return accountModel;
  }

  private filterTransactions(transactions: Transaction[], accountId: Id, filters: Filters): Transaction[] {
    return transactions
      .filter((transaction) => {
        switch (filters.transactionType) {
          case TransactionType.cashout:
            return transaction.debitedAccountId === accountId;
          case TransactionType.cashin:
            return transaction.creditedAccountId === accountId;
          default:
            return true;
        }
      })
      .filter(({ createdAt }) => {
        let inRange = true;

        if (filters.startDate) inRange = inRange && createdAt >= filters.startDate;
        if (filters.endDate) inRange = inRange && createdAt <= filters.endDate;

        return inRange;
      });
  }

  private sortTransactionsByDate(transactions: Transaction[]): Transaction[] {
    return transactions.sort((a, b) => {
      if (a.createdAt > b.createdAt) return -1;
      if (a.createdAt < b.createdAt) return 1;
      return 0;
    });
  }
}
