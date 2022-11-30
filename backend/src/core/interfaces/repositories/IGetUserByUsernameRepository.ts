import User from '@core/entities/User';
import Username from '@core/entities/value-objects/username';

export default interface IGetUserByUsernameRepository {
  perform(username: Username): Promise<User>;
}
