import User from '@core/entities/User';

export default interface IUserTokenDecoder {
  decode(token: string): User;
}
