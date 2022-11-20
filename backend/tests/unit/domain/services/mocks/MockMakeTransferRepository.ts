import Transaction from '../../../../../src/domain/entities/Transaction';
import User from '../../../../../src/domain/entities/User';
import MonetaryValue from '../../../../../src/domain/entities/value-objects/monetary-value';
import IMakeTransferRepository from '../../../../../src/domain/interfaces/repositories/IMakeTransferRepository';

export default class MockMakeTransferRepository implements IMakeTransferRepository {
  constructor(public fakeTransaction: Transaction) {}

  async perform(_sourceUser: User, _destinationUser: User, _amount: MonetaryValue): Promise<Transaction> {
    return this.fakeTransaction;
  }
}
