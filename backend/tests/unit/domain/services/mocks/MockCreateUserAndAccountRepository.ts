import User from '@domain/entities/User';
import Username from '@domain/entities/value-objects/username';
import ICreateUserAndAccountRepository from '@domain/interfaces/repositories/ICreateUserAndAccountRepository';

export default class MockCreateUserAndAccountRepository implements ICreateUserAndAccountRepository {
  constructor(public fakeUser: User) {}

  async perform(_username: Username, _passwordHash: string): Promise<User> {
    return this.fakeUser;
  }
}
