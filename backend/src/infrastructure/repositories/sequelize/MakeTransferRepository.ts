import { Transaction as SequelizeTransaction } from 'sequelize';
import Id from '@domain/entities/value-objects/id';
import User from '@domain/entities/User';
import Transaction from '@domain/entities/Transaction';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import IMakeTransferRepository from '@domain/interfaces/repositories/IMakeTransferRepository';
import UserNotFoundError from './errors/UserNotFoundError';
import UserModel from './database/models/User';
import TransactionModel from './database/models/Transaction';
import AccountModel from './database/models/Account';
import sequelize from './database';

export default class MakeTransferRepository implements IMakeTransferRepository {
  async perform(sourceUser: User, destinationUser: User, amount: MonetaryValue): Promise<Transaction> {
    const sourceUserModel = await this.getUserModelById(sourceUser.id);
    const destinationUserModel = await this.getUserModelById(destinationUser.id);

    return sequelize.transaction(async (transaction) => {
      await this.updateAccountBalance(sourceUserModel.account, -amount.value, transaction);
      await this.updateAccountBalance(destinationUserModel.account, amount.value, transaction);

      const transactionModel: TransactionModel = await TransactionModel.create({
        debitedAccountId: sourceUserModel.accountId,
        creditedAccountId: destinationUserModel.accountId,
        value: amount.value,
      }, { transaction });

      return Transaction.create(transactionModel.toJSON());
    });
  }

  private async getUserModelById(id: Id): Promise<UserModel> {
    const userModel: UserModel | null = await UserModel.findOne({
      where: { id: id.value },
      include: [AccountModel],
    });

    if (!userModel) throw new UserNotFoundError();

    return userModel;
  }

  private async updateAccountBalance(account: AccountModel, value: number, transaction: SequelizeTransaction) {
    await account.update({ balance: account.balance + value }, { transaction });
  }
}
