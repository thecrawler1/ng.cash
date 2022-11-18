import Password from '@domain/entities/value-objects/password';
import Username from '@domain/entities/value-objects/username';
import IController from '@domain/interfaces/controller/IController';
import IRequest from '@domain/interfaces/controller/IRequest';
import IResponse from '@domain/interfaces/controller/IResponse';
import ILoginService from '@domain/interfaces/services/ILoginService';
import RequiredPayloadNotProvidedError from './errors/RequiredPaylodNotProvidedError';
import { ok } from './helpers/httpResponses';

export default class LoginController implements IController {
  constructor(private loginService: ILoginService) {}

  async handle(request: IRequest): Promise<IResponse> {
    LoginController.validateRequest(request);

    const username: Username = Username.create(request.payload.username);
    const password: Password = Password.create(request.payload.password);
    const { token } = await this.loginService.perform(username, password);

    return ok({ token });
  }

  private static validateRequest({ payload }: IRequest): void {
    if (!payload.username || !payload.password) {
      throw new RequiredPayloadNotProvidedError();
    }
  }
}
