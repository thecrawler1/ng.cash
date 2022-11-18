import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';

export default interface IGetUserBalanceService {
  perform(user: User): Promise<MonetaryValue>;
}
