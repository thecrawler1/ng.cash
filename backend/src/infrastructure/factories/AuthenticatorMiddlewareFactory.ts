import AuthenticatorMiddleware from '@core/middlewares/AuthenticatorMiddleware';
import UserTokenDecoder from '@infrastructure/token-manager/UserTokenDecoder';

export default abstract class AuthenticatorMiddlewareFactory {
  static make(): AuthenticatorMiddleware {
    const userTokenDecoder = new UserTokenDecoder();

    return new AuthenticatorMiddleware(userTokenDecoder);
  }
}
