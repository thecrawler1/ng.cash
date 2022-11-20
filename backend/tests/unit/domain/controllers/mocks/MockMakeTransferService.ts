import Transaction from '../../../../../src/domain/entities/Transaction';
import User from '../../../../../src/domain/entities/User';
import MonetaryValue from '../../../../../src/domain/entities/value-objects/monetary-value';
import Username from '../../../../../src/domain/entities/value-objects/username';
import IMakeTransferService from '../../../../../src/domain/interfaces/services/IMakeTransferService';

export default class MockMakeTransferService implements IMakeTransferService {
  constructor(public fakeTransaction: Transaction) {}

  async perform(_sourceUser: User, _destinationUsername: Username, _amount: MonetaryValue): Promise<Transaction> {
    return this.fakeTransaction;
  }
}
