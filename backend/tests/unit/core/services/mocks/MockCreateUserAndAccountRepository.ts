import User from '../../../../../src/core/entities/User';
import Username from '../../../../../src/core/entities/value-objects/username';
import ICreateUserAndAccountRepository from '../../../../../src/core/interfaces/repositories/ICreateUserAndAccountRepository';

export default class MockCreateUserAndAccountRepository implements ICreateUserAndAccountRepository {
  constructor(public fakeUser: User) {}

  async perform(_username: Username, _passwordHash: string): Promise<User> {
    return this.fakeUser;
  }
}
