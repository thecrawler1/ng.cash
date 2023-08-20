import User from '@core/entities/User';
import Username from '@core/entities/value-objects/username';

export default interface ICreateUserAndAccountRepository {
  perform(username: Username, passwordHash: string, balance: number): Promise<User>;
}
