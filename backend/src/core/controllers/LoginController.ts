import Password from '@core/entities/value-objects/password';
import Username from '@core/entities/value-objects/username';
import IController from '@core/interfaces/controller/IController';
import IRequest from '@core/interfaces/controller/IRequest';
import IResponse from '@core/interfaces/controller/IResponse';
import ILoginService from '@core/interfaces/services/ILoginService';
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
