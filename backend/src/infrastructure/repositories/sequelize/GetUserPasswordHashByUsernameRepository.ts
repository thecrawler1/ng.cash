import Username from '@domain/entities/value-objects/username';
import IGetUserPasswordHashByUsernameRepository from '@domain/interfaces/repositories/IGetUserPasswordHashByUsernameRepository';
import UserModel from './database/models/User';
import UserNotFoundError from './errors/UserNotFoundError';

export default class GetUserPasswordHashByUsernameRepository implements IGetUserPasswordHashByUsernameRepository {
  async perform(username: Username): Promise<string> {
    const userModel: UserModel | null = await UserModel.findOne({
      where: { username: username.value },
    });

    if (!userModel) {
      throw new UserNotFoundError();
    }

    return userModel.password;
  }
}
