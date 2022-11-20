import Username from '../../../../../src/domain/entities/value-objects/username';
import IGetUserPasswordHashByUsernameRepository from '../../../../../src/domain/interfaces/repositories/IGetUserPasswordHashByUsernameRepository';

export default class MockGetUserPasswordHashByUsernameRepository implements IGetUserPasswordHashByUsernameRepository {
  constructor(public fakePasswordHash = 'fake_password_hash') {}

  async perform(_username: Username): Promise<string> {
    return this.fakePasswordHash;
  }
}
