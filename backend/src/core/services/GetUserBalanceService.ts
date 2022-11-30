import Account from '@core/entities/Account';
import User from '@core/entities/User';
import MonetaryValue from '@core/entities/value-objects/monetary-value';
import IGetAccountByIdRepository from '@core/interfaces/repositories/IGetAccountByIdRepository';
import IGetUserBalanceService from '@core/interfaces/services/IGetUserBalanceService';

export default class GetUserBalanceService implements IGetUserBalanceService {
  constructor(private getAccountById: IGetAccountByIdRepository) {}

  async perform(user: User): Promise<MonetaryValue> {
    const account: Account = await this.getAccountById.perform(user.accountId);

    return account.balance;
  }
}
