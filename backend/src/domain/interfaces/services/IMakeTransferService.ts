import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import Username from '@domain/entities/value-objects/username';

export default interface IMakeTransferService {
  perform(sourceUser: User, destinationUsername: Username, amount: MonetaryValue): Promise<Transaction>;
}
