import Account from '@domain/entities/Account';
import Id from '@domain/entities/value-objects/id';
import IGetAccountByIdRepository from '@domain/interfaces/repositories/IGetAccountByIdRepository';

export default class MockGetAccountById implements IGetAccountByIdRepository {
  constructor(public fakeAccount: Account) {}

  async perform(_id: Id): Promise<Account> {
    return this.fakeAccount;
  }
}
