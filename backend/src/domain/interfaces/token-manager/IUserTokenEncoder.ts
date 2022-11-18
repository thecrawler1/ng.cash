import User from '@domain/entities/User';

export default interface IUserTokenEncoder {
  encode(user: User, expiresIn: number): string;
}
