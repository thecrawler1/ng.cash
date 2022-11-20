import Password from '../../../../../src/domain/entities/value-objects/password';
import IHashGenerator from '../../../../../src/domain/interfaces/password-hash-manager/IHashGenerator';

export default class MockHashGenerator implements IHashGenerator {
  constructor(public fakePasswordHash = 'fake_password_hash') {}

  async generate(_password: Password): Promise<string> {
    return this.fakePasswordHash;
  }
}
