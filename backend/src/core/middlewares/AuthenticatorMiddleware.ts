import IRequest from '@core/interfaces/middleware/IRequest';
import IResponse from '@core/interfaces/middleware/IResponse';
import IMiddleware from '@core/interfaces/middleware/IMiddleware';
import TokenNotProvidedError from './errors/TokenNotProvidedError';
import IUserTokenDecoder from '@core/interfaces/token-manager/IUserTokenDecoder';
import User from '@core/entities/User';
import UserDTO from '@core/entities/dtos/UserDTO';

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
