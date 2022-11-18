import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';

export default interface IMakeTransferRepository {
  perform(sourceUser: User, destinationUser: User, amount: MonetaryValue): Promise<Transaction>;
}
