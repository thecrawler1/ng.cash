import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import IGetAccountByIdRepository from '@domain/interfaces/repositories/IGetAccountByIdRepository';
import IGetUserBalanceService from '@domain/interfaces/services/IGetUserBalanceService';

export default class GetUserBalanceService implements IGetUserBalanceService {
  constructor(private getAccountById: IGetAccountByIdRepository) {}

  async perform(user: User): Promise<MonetaryValue> {
    const account = await this.getAccountById.perform(user.accountId);

    return account.balance;
  }
}
