import Password from '@core/entities/value-objects/password';
import Username from '@core/entities/value-objects/username';
import IController from '@core/interfaces/controller/IController';
import IRequest from '@core/interfaces/controller/IRequest';
import IResponse from '@core/interfaces/controller/IResponse';
import ICreateUserService from '@core/interfaces/services/ICreateUserService';
import RequiredPayloadNotProvidedError from './errors/RequiredPaylodNotProvidedError';
import { created } from './helpers/httpResponses';

export default class CreateUserController implements IController {
  constructor(private createUser: ICreateUserService) {}
 
  async handle(request: IRequest): Promise<IResponse> {
    CreateUserController.validateRequest(request);

    const username: Username = Username.create(request.payload.username);
    const password: Password = Password.create(request.payload.password);
    const { token } = await this.createUser.perform(username, password);

    return created({ token });
  }

  private static validateRequest({ payload }: IRequest): void {
    if (!payload.username || !payload.password) {
      throw new RequiredPayloadNotProvidedError();
    }
  }
}
