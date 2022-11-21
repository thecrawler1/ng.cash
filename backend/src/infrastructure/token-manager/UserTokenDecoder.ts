import { verify } from 'jsonwebtoken';
import User from '@domain/entities/User';
import UserDTO from '@domain/entities/dtos/UserDTO';
import IUserTokenDecoder from '@domain/interfaces/token-manager/IUserTokenDecoder';
import InvalidTokenError from './errors/InvalidTokenError';

export default class UserTokenDecoder implements IUserTokenDecoder {
  decode(token: string): User {
    const secret = process.env.JWT_SECRET || 'jwt_secret';

    try {
      const decoded = verify(token, secret);
      return User.create(decoded as UserDTO);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Invalid token';
      throw new InvalidTokenError(message);
    }
  }
}
