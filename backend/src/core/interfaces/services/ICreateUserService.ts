import Password from '@core/entities/value-objects/password';
import Username from '@core/entities/value-objects/username';

export default interface ICreateUserService {
  perform(username: Username, password: Password): Promise<{ token: string }>;
}
