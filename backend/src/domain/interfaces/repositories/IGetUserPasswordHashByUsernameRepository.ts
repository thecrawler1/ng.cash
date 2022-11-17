import Username from '@domain/entities/value-objects/username';

export default interface IGetUserPasswordHashByUsernameRepository {
  perform(username: Username): Promise<string>;
}
