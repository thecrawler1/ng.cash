import Username from '@domain/entities/value-objects/username';
import IGetUserPasswordHashByUsernameRepository from '@domain/interfaces/repositories/IGetUserPasswordHashByUsernameRepository';

export default class MockGetUserPasswordHashByUsernameRepository implements IGetUserPasswordHashByUsernameRepository {
  constructor(public fakePasswordHash = 'fake_password_hash') {}

  async perform(_username: Username): Promise<string> {
    return this.fakePasswordHash;
  }
}
