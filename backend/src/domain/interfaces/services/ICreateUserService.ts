import Password from '@domain/entities/value-objects/password';
import Username from '@domain/entities/value-objects/username';

export default interface ICreateUserService {
  perform(username: Username, password: Password): Promise<{ token: string }>;
}
