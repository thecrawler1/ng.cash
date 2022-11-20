import User from '../../../../../src/domain/entities/User';
import Username from '../../../../../src/domain/entities/value-objects/username';
import IGetUserByUsernameRepository from '../../../../../src/domain/interfaces/repositories/IGetUserByUsernameRepository';

export default class MockGetUserByUsernameRepository implements IGetUserByUsernameRepository {
  constructor(public fakeUser: User) {}

  async perform(_username: Username): Promise<User> {
    return this.fakeUser;
  }
}
