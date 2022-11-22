import User from '@domain/entities/User';

export const TOKEN_EXPIRATION = '24h';

export default interface IUserTokenEncoder {
  encode(user: User): string;
}
