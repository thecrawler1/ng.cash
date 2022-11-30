import User from '../../../../../src/core/entities/User';
import MonetaryValue from '../../../../../src/core/entities/value-objects/monetary-value';
import IGetUserBalanceService from '../../../../../src/core/interfaces/services/IGetUserBalanceService';

export default class MockGetUserBalanceService implements IGetUserBalanceService {
  constructor(public fakeBalance: MonetaryValue) {}

  async perform(_user: User): Promise<MonetaryValue> {
    return this.fakeBalance;
  }
}
