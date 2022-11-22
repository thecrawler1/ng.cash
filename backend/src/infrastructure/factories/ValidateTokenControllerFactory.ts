import ValidateTokenController from '@domain/controllers/ValidateTokenController';
import ValidateTokenService from '@domain/services/ValidateTokenService';
import UserTokenDecoder from '@infrastructure/token-manager/UserTokenDecoder';

export default abstract class ValidateTokenControllerFactory {
  static make(): ValidateTokenController {
    const userTokenDecoder = new UserTokenDecoder();
    const validateTokenService = new ValidateTokenService(userTokenDecoder);

    return new ValidateTokenController(validateTokenService);
  }
}
