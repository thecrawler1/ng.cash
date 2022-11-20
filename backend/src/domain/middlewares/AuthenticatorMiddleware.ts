import IRequest from '@domain/interfaces/middleware/IRequest';
import IResponse from '@domain/interfaces/middleware/IResponse';
import IMiddleware from '@domain/interfaces/middleware/IMiddleware';
import TokenNotProvidedError from './errors/TokenNotProvidedError';
import IUserTokenDecoder from '@domain/interfaces/token-manager/IUserTokenDecoder';
import User from '@domain/entities/User';
import UserDTO from '@domain/entities/dtos/UserDTO';

export default class AuthenticatorMiddleware implements IMiddleware {
  constructor(private userTokenDecoder: IUserTokenDecoder) {}

  handle({ token }: IRequest): IResponse {
    if (!token) {
      throw new TokenNotProvidedError();
    }

    const user: User = this.userTokenDecoder.decode(token);
    const userDTO: UserDTO = user.toDTO();

    return { body: { userDTO } };
  }
}
