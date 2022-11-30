import User from '../../../../../src/core/entities/User';
import Username from '../../../../../src/core/entities/value-objects/username';
import IGetUserByUsernameRepository from '../../../../../src/core/interfaces/repositories/IGetUserByUsernameRepository';

export default class MockGetUserByUsernameRepository implements IGetUserByUsernameRepository {
  constructor(public fakeUser: User) {}

  async perform(_username: Username): Promise<User> {
    return this.fakeUser;
  }
}
