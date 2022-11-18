import IRequest from '@domain/interfaces/middleware/IRequest';
import IResponse from '@domain/interfaces/middleware/IResponse';
import IMiddleware from '@domain/interfaces/middleware/IMiddleware';
import TokenNotProvidedError from './errors/TokenNotProvidedError';
import IJwtUserDecoder from '@domain/interfaces/middleware/IJwtUserDecoder';
import User from '@domain/entities/User';
import UserDTO from '@domain/entities/dtos/UserDTO';

export default class AuthenticatorMiddleware implements IMiddleware {
  constructor(private jwtUserDecoder: IJwtUserDecoder) {}

  handle(request: IRequest): IResponse {
    AuthenticatorMiddleware.validateRequest(request);

    const user: User = this.jwtUserDecoder.decode(request.token);
    const userDTO: UserDTO = user.toDTO();

    return { body: { userDTO } };
  }

  private static validateRequest({ token }: IRequest): void {
    if (!token) {
      throw new TokenNotProvidedError();
    }
  }
}
