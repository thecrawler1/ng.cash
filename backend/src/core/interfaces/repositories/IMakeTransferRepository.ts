import Transaction from '@core/entities/Transaction';
import User from '@core/entities/User';
import MonetaryValue from '@core/entities/value-objects/monetary-value';

export default interface IMakeTransferRepository {
  perform(sourceUser: User, destinationUser: User, amount: MonetaryValue): Promise<Transaction>;
}
