import Transaction from '@core/entities/Transaction';
import User from '@core/entities/User';
import MonetaryValue from '@core/entities/value-objects/monetary-value';
import Username from '@core/entities/value-objects/username';

export default interface IMakeTransferService {
  perform(sourceUser: User, destinationUsername: Username, amount: MonetaryValue): Promise<Transaction>;
}
