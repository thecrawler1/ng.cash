import User from '@domain/entities/User';
import Username from '@domain/entities/value-objects/username';

export default interface IGetUserByUsernameRepository {
  perform(username: Username): Promise<User>;
}
