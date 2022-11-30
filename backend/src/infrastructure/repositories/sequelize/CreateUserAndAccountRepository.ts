import User from '@core/entities/User';
import Account from '@core/entities/Account';
import Username from '@core/entities/value-objects/username';
import ICreateUserAndAccountRepository from '@core/interfaces/repositories/ICreateUserAndAccountRepository';
import UserModel from './database/models/User';
import AccountModel from './database/models/Account';
import sequelize from './database';

export default class CreateUserAndAccountRepository implements ICreateUserAndAccountRepository {
  async perform(username: Username, passwordHash: string): Promise<User> {
    return sequelize.transaction(async (transaction) => {
      const accountModel: AccountModel = await AccountModel.create(
        { balance: Account.INITIAL_BALANCE },
        { transaction },
      );
      const userModel: UserModel = await UserModel.create(
        {
          username: username.value,
          password: passwordHash,
          accountId: accountModel.id,
        },
        { transaction },
      );

      return User.create({
        id: userModel.id,
        username: userModel.username,
        accountId: userModel.accountId,
      });
    });
  }
}
