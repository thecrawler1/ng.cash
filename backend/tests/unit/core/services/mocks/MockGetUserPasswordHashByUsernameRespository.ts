import Username from '../../../../../src/core/entities/value-objects/username';
import IGetUserPasswordHashByUsernameRepository from '../../../../../src/core/interfaces/repositories/IGetUserPasswordHashByUsernameRepository';

export default class MockGetUserPasswordHashByUsernameRepository implements IGetUserPasswordHashByUsernameRepository {
  constructor(public fakePasswordHash = 'fake_password_hash') {}

  async perform(_username: Username): Promise<string> {
    return this.fakePasswordHash;
  }
}
