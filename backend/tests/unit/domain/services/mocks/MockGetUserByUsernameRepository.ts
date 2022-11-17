import User from '@domain/entities/User';
import Username from '@domain/entities/value-objects/username';
import IGetUserByUsernameRepository from '@domain/interfaces/repositories/IGetUserByUsernameRepository';

export default class MockGetUserByUsernameRepository implements IGetUserByUsernameRepository {
  constructor(public fakeUser: User) {}

  async perform(_username: Username): Promise<User> {
    return this.fakeUser;
  }
}
