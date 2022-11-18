import Password from '@domain/entities/value-objects/password';

export default interface IHashGenerator {
  generate(password: Password): Promise<string>;
}
