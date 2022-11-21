import User from '@domain/entities/User';
import Transaction from '@domain/entities/Transaction';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import IMakeTransferRepository from '@domain/interfaces/repositories/IMakeTransferRepository';
import UserNotFoundError from './errors/UserNotFoundError';
import AccountNotFoundError from './errors/AccountNotFoundError';
import UserModel from './database/models/User';
import TransactionModel from './database/models/Transaction';
import AccountModel from './database/models/Account';
import sequelize from './database';

export default class MakeTransferRepository implements IMakeTransferRepository {
  async perform(sourceUser: User, destinationUser: User, amount: MonetaryValue): Promise<Transaction> {
    const sourceUserModel: UserModel | null = await UserModel.findOne({
      where: { id: sourceUser.id.value },
      include: [AccountModel],
    });
    const destinationUserModel: UserModel | null = await UserModel.findOne({
      where: { id: destinationUser.id.value },
      include: [AccountModel],
    });

    if (!sourceUserModel || !destinationUserModel) {
      throw new UserNotFoundError();
    }

    const sourceAccountModel: AccountModel | null = await sourceUserModel.$get('account');
    const destinationAccountModel: AccountModel | null = await destinationUserModel.$get('account');

    if (!sourceAccountModel || !destinationAccountModel) {
      throw new AccountNotFoundError();
    }

    return sequelize.transaction(async (transaction) => {
      const newSourceBalance = sourceAccountModel.balance - amount.value;
      await sourceAccountModel.update({ balance: newSourceBalance }, { transaction });

      const newDestinationBalance = destinationAccountModel.balance + amount.value;
      await destinationAccountModel.update({ balance: newDestinationBalance }, { transaction });

      const transactionModel: TransactionModel = await TransactionModel.create({
        debitedAccountId: sourceAccountModel.id,
        creditedAccountId: destinationAccountModel.id,
        value: amount.value,
      }, { transaction });

      return Transaction.create(transactionModel.toJSON());
    });
  }
}
