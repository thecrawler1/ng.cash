import Account from '@domain/entities/Account';
import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import Username from '@domain/entities/value-objects/username';
import IGetAccountByIdRepository from '@domain/interfaces/repositories/IGetAccountByIdRepository';
import IGetUserByUsernameRepository from '@domain/interfaces/repositories/IGetUserByUsernameRepository';
import IMakeTransferRepository from '@domain/interfaces/repositories/IMakeTransferRepository';
import IMakeTransferService from '@domain/interfaces/services/IMakeTransferService';
import InsufficientBalanceError from './errors/InsufficientBalanceError';
import InvalidTransferToYourselfError from './errors/InvalidTransferToYourselfError';

export default class MakeTransferService implements IMakeTransferService {
  constructor(
    private getUserByUsername: IGetUserByUsernameRepository,
    private getAccoutById: IGetAccountByIdRepository,
    private makeTransfer: IMakeTransferRepository,
  ) {}

  async perform(sourceUser: User, destinationUsername: Username, amount: MonetaryValue): Promise<Transaction> {
    const destinationUser: User = await this.getUserByUsername.perform(destinationUsername);

    MakeTransferService.validateIfTheUsersAreDifferents(sourceUser, destinationUser);
    await this.validateIfTheBalanceIsSufficient(sourceUser, amount);

    return this.makeTransfer.perform(sourceUser, destinationUser, amount);
  }

  private static validateIfTheUsersAreDifferents(sourceUser: User, destinationUser: User): void {
    if (sourceUser.equals(destinationUser)) {
      throw new InvalidTransferToYourselfError();
    }
  }

  private async validateIfTheBalanceIsSufficient(user: User, amount: MonetaryValue): Promise<void> {
    const account: Account = await this.getAccoutById.perform(user.accountId);

    if (account.balance.value < amount.value) {
      throw new InsufficientBalanceError();
    }
  }
}
