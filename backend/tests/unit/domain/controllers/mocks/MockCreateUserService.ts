import User from '@domain/entities/User';
import Password from '@domain/entities/value-objects/password';
import Username from '@domain/entities/value-objects/username';
import ICreateUserService from '@domain/interfaces/services/ICreateUserService';

export default class MockCreateUserService implements ICreateUserService {
  constructor(public fakeUser: User) {}

  async perform(_username: Username, _password: Password): Promise<User> {
    return this.fakeUser;
  }
}
