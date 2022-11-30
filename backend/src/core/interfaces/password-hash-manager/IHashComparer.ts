import Password from '@core/entities/value-objects/password';

export default interface IHashComparer {
  compare(password: Password, passwordHash: string): Promise<boolean>;
}
