import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import IMakeTransferRepository from '@domain/interfaces/repositories/IMakeTransferRepository';

export default class MockMakeTransferRepository implements IMakeTransferRepository {
  constructor(public fakeTransaction: Transaction) {}

  async perform(_sourceUser: User, _destinationUser: User, _amount: MonetaryValue): Promise<Transaction> {
    return this.fakeTransaction;
  }
}
