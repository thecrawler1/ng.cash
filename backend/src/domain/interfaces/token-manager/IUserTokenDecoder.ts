import User from '@domain/entities/User';

export default interface IUserTokenDecoder {
  decode(token: string): User;
}
