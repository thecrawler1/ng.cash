import User from '@core/entities/User';
import MonetaryValue from '@core/entities/value-objects/monetary-value';

export default interface IGetUserBalanceService {
  perform(user: User): Promise<MonetaryValue>;
}
