import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';

export enum TransactionType {
  cashout = 'cash-out',
  cashin = 'cash-in',
  both = 'both',
}

export type Filters = {
  date?: Date,
  transactionType: TransactionType,
};

export default interface IGetUserTransactionsService {
  perform(user: User, filters: Filters): Promise<Transaction[]>;
}
