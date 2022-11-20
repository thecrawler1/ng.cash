import Username from '../../../../../src/domain/entities/value-objects/username';
import ICheckIfUsernameIsBeingUsedRepository from '../../../../../src/domain/interfaces/repositories/ICheckIfUsernameIsBeingUsedRepository';

export default class MockCheckIfUsernameIsBeingUsedRepository implements ICheckIfUsernameIsBeingUsedRepository {
  constructor(public result: boolean) {}

  async perform(_username: Username): Promise<boolean> {
    return this.result;
  }
}
