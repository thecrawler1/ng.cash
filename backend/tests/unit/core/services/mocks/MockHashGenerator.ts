import Password from '../../../../../src/core/entities/value-objects/password';
import IHashGenerator from '../../../../../src/core/interfaces/password-hash-manager/IHashGenerator';

export default class MockHashGenerator implements IHashGenerator {
  constructor(public fakePasswordHash = 'fake_password_hash') {}

  async generate(_password: Password): Promise<string> {
    return this.fakePasswordHash;
  }
}
