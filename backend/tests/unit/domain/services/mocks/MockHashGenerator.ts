import Password from '@domain/entities/value-objects/password';
import IHashGenerator from '@domain/interfaces/services/IHashGenerator';

export default class MockHashGenerator implements IHashGenerator {
  constructor(public fakePasswordHash = 'fake_password_hash') {}

  async generate(_password: Password): Promise<string> {
    return this.fakePasswordHash;
  }
}
