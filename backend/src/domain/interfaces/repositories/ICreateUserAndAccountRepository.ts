import User from '@domain/entities/User';
import Username from '@domain/entities/value-objects/username';

export default interface ICreateUserAndAccountRepository {
  perform(username: Username, passwordHash: string): Promise<User>;
}
