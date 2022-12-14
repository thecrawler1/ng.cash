import Password from '../../../../../src/core/entities/value-objects/password';
import IHashComparer from '../../../../../src/core/interfaces/password-hash-manager/IHashComparer';

export default class MockHashComparer implements IHashComparer {
  constructor(public result: boolean) {}

  async compare(_password: Password, _passwordHash: string): Promise<boolean> {
    return this.result;
  }
}
