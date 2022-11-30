import Transaction from '@core/entities/Transaction';
import User from '@core/entities/User';

export enum TransactionType {
  cashout = 'cashout',
  cashin = 'cashin',
  both = 'both',
}

export type Filters = {
  startDate?: Date,
  endDate?: Date,
  transactionType: TransactionType,
};

export default interface IGetUserTransactionsService {
  perform(user: User, filters: Filters): Promise<Transaction[]>;
}
