import User from '@domain/entities/User';
import Username from '@domain/entities/value-objects/username';
import IGetUserByUsernameRepository from '@domain/interfaces/repositories/IGetUserByUsernameRepository';
import UserModel from './database/models/User';
import UserNotFoundError from './errors/UserNotFoundError';

export default class GetUserByUsernameRepository implements IGetUserByUsernameRepository {
  async perform(username: Username): Promise<User> {
    const userModel: UserModel | null = await UserModel.findOne({
      where: { username: username.value },
    });

    if (!userModel) {
      throw new UserNotFoundError();
    }

    return User.create({
      id: userModel.id,
      username: userModel.username,
      accountId: userModel.accountId,
    });
  }
}
