import Account from '../../../../../src/core/entities/Account';
import Id from '../../../../../src/core/entities/value-objects/id';
import IGetAccountByIdRepository from '../../../../../src/core/interfaces/repositories/IGetAccountByIdRepository';

export default class MockGetAccountById implements IGetAccountByIdRepository {
  constructor(public fakeAccount: Account) {}

  async perform(_id: Id): Promise<Account> {
    return this.fakeAccount;
  }
}
