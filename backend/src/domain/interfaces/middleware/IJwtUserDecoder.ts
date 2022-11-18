import User from '@domain/entities/User';

export default interface IJwtUserDecoder {
  decode(token: string): User;
}
