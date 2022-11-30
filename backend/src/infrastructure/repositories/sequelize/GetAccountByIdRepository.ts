import Account from '@core/entities/Account';
import Id from '@core/entities/value-objects/id';
import IGetAccountByIdRepository from '@core/interfaces/repositories/IGetAccountByIdRepository';
import AccountModel from './database/models/Account';
import AccountNotFoundError from './errors/AccountNotFoundError';

export default class GetAccountByIdRepository implements IGetAccountByIdRepository {
  async perform(id: Id): Promise<Account> {
    const accountModel: AccountModel | null = await AccountModel.findOne({
      where: { id: id.value },
    });

    if (!accountModel) {
      throw new AccountNotFoundError();
    }

    return Account.create(accountModel.toJSON());
  }
}
