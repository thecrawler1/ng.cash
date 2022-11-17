import Username from '@domain/entities/value-objects/username';

export default interface ICheckIfUsernameIsBeingUsedRepository {
  perform(username: Username): Promise<boolean>;
}
