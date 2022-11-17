import Password from '@domain/entities/value-objects/password';
import IHashComparer from '@domain/interfaces/services/IHashComparer';

export default class MockHashComparer implements IHashComparer {
  constructor(public result: boolean) {}

  async compare(_password: Password, _passwordHash: string): Promise<boolean> {
    return this.result;
  }
}
