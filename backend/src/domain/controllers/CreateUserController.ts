import User from '@domain/entities/User';
import Password from '@domain/entities/value-objects/password';
import Username from '@domain/entities/value-objects/username';
import IController from '@domain/interfaces/controller/IController';
import IRequest from '@domain/interfaces/controller/IRequest';
import IResponse from '@domain/interfaces/controller/IResponse';
import ICreateUserService from '@domain/interfaces/services/ICreateUserService';
import RequiredPayloadNotProvidedError from './errors/RequiredPaylodNotProvidedError';
import { created } from './helpers/httpResponses';

export default class CreateUserController implements IController {
  constructor(private createUser: ICreateUserService) {}
 
  async handle(request: IRequest): Promise<IResponse> {
    CreateUserController.validateRequest(request);

    const username: Username = Username.create(request.payload.username);
    const password: Password = Password.create(request.payload.password);
    const user: User = await this.createUser.perform(username, password);

    return created(user.toDTO());
  }

  private static validateRequest({ payload }: IRequest): void {
    if (!payload.username || !payload.password) {
      throw new RequiredPayloadNotProvidedError();
    }
  }
}
