import Account from '../../../../../src/domain/entities/Account';
import Id from '../../../../../src/domain/entities/value-objects/id';
import IGetAccountByIdRepository from '../../../../../src/domain/interfaces/repositories/IGetAccountByIdRepository';

export default class MockGetAccountById implements IGetAccountByIdRepository {
  constructor(public fakeAccount: Account) {}

  async perform(_id: Id): Promise<Account> {
    return this.fakeAccount;
  }
}
