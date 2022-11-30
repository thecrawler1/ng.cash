import IController from '@core/interfaces/controller/IController';
import IRequest from '@core/interfaces/controller/IRequest';
import IResponse from '@core/interfaces/controller/IResponse';
import IValidateTokenService from '@core/interfaces/services/IValidateTokenService';
import RequiredPayloadNotProvidedError from './errors/RequiredPaylodNotProvidedError';
import { ok } from './helpers/httpResponses';

export default class ValidateTokenController implements IController {
  constructor(private validateTokenService: IValidateTokenService) {}

  async handle(request: IRequest): Promise<IResponse> {
    ValidateTokenController.validateRequest(request);

    const isValid = this.validateTokenService.perform(request.payload.token);

    return ok({ isValid });
  }

  private static validateRequest({ payload }: IRequest): void {
    if (!payload.token) {
      throw new RequiredPayloadNotProvidedError();
    }
  }
}
