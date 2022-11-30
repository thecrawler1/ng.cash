import Transaction from '../../../../../src/core/entities/Transaction';
import User from '../../../../../src/core/entities/User';
import MonetaryValue from '../../../../../src/core/entities/value-objects/monetary-value';
import IMakeTransferRepository from '../../../../../src/core/interfaces/repositories/IMakeTransferRepository';

export default class MockMakeTransferRepository implements IMakeTransferRepository {
  constructor(public fakeTransaction: Transaction) {}

  async perform(_sourceUser: User, _destinationUser: User, _amount: MonetaryValue): Promise<Transaction> {
    return this.fakeTransaction;
  }
}
