import Username from '@core/entities/value-objects/username';

export default interface IGetUserPasswordHashByUsernameRepository {
  perform(username: Username): Promise<string>;
}
