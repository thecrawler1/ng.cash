import User from '../../../../../src/domain/entities/User';
import Password from '../../../../../src/domain/entities/value-objects/password';
import Username from '../../../../../src/domain/entities/value-objects/username';
import ICreateUserService from '../../../../../src/domain/interfaces/services/ICreateUserService';

export default class MockCreateUserService implements ICreateUserService {
  constructor(public fakeUser: User) {}

  async perform(_username: Username, _password: Password): Promise<User> {
    return this.fakeUser;
  }
}
