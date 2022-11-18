import Transaction from '@domain/entities/Transaction';
import Id from '@domain/entities/value-objects/id';
import { Filters } from '../services/IGetUserTransactionsService';

export default interface IGetTransactionsByAccountIdRepository {
  perform(accountId: Id, filters: Filters): Promise<Transaction[]>;
}
