import User from '@domain/entities/User';

export default interface IJwtUserEncoder {
  encode(user: User, expiresIn: number): string;
}
