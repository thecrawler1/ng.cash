import User from '../../../../../src/domain/entities/User';
import MonetaryValue from '../../../../../src/domain/entities/value-objects/monetary-value';
import IGetUserBalanceService from '../../../../../src/domain/interfaces/services/IGetUserBalanceService';

export default class MockGetUserBalanceService implements IGetUserBalanceService {
  constructor(public fakeBalance: MonetaryValue) {}

  async perform(_user: User): Promise<MonetaryValue> {
    return this.fakeBalance;
  }
}
