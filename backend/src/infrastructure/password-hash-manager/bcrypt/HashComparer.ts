import { compare } from 'bcrypt';
import Password from '@core/entities/value-objects/password';
import IHashComparer from '@core/interfaces/password-hash-manager/IHashComparer';

export default class HashComparer implements IHashComparer {
  async compare(password: Password, passwordHash: string): Promise<boolean> {
    return compare(password.value, passwordHash);
  }
}
