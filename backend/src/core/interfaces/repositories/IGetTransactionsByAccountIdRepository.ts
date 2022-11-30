import Transaction from '@core/entities/Transaction';
import Id from '@core/entities/value-objects/id';
import { Filters } from '../services/IGetUserTransactionsService';

export default interface IGetTransactionsByAccountIdRepository {
  perform(accountId: Id, filters: Filters): Promise<Transaction[]>;
}
