import Transaction from '../../../../../src/core/entities/Transaction';
import User from '../../../../../src/core/entities/User';
import MonetaryValue from '../../../../../src/core/entities/value-objects/monetary-value';
import Username from '../../../../../src/core/entities/value-objects/username';
import IMakeTransferService from '../../../../../src/core/interfaces/services/IMakeTransferService';

export default class MockMakeTransferService implements IMakeTransferService {
  constructor(public fakeTransaction: Transaction) {}

  async perform(_sourceUser: User, _destinationUsername: Username, _amount: MonetaryValue): Promise<Transaction> {
    return this.fakeTransaction;
  }
}
