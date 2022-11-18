import Transaction from '@domain/entities/Transaction';
import User from '@domain/entities/User';
import MonetaryValue from '@domain/entities/value-objects/monetary-value';
import Username from '@domain/entities/value-objects/username';
import IMakeTransferService from '@domain/interfaces/services/IMakeTransferService';

export default class MockMakeTransferService implements IMakeTransferService {
  constructor(public fakeTransaction: Transaction) {}

  async perform(_sourceUser: User, _destinationUsername: Username, _amount: MonetaryValue): Promise<Transaction> {
    return this.fakeTransaction;
  }
}
