import ICheckIfUsernameIsBeingUsedRepository from '@core/interfaces/repositories/ICheckIfUsernameIsBeingUsedRepository';
import Username from '@core/entities/value-objects/username';
import UserModel from './database/models/User';

export default class CheckIfUsernameIsBeingUsedRepository implements ICheckIfUsernameIsBeingUsedRepository {
  async perform(username: Username): Promise<boolean> {
    const userModelOrNull: UserModel | null = await UserModel.findOne({
      where: { username: username.value },
    });

    return !!userModelOrNull;
  }
}
