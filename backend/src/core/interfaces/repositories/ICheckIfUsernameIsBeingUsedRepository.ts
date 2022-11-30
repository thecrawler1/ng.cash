import Username from '@core/entities/value-objects/username';

export default interface ICheckIfUsernameIsBeingUsedRepository {
  perform(username: Username): Promise<boolean>;
}
