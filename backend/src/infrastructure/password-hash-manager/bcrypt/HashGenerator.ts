import { hash } from 'bcrypt';
import IHashGenerator from '@core/interfaces/password-hash-manager/IHashGenerator';
import Password from '@core/entities/value-objects/password';

export default class HashGenerator implements IHashGenerator {
  private readonly SALT_ROUNDS = 10;

  async generate(password: Password): Promise<string> {
    return hash(password.value, this.SALT_ROUNDS);
  }
}
