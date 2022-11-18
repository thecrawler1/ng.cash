import User from '@domain/entities/User';
import IUserTokenDecoder from '@domain/interfaces/token-manager/IUserTokenDecoder';

export default class MockUserTokenDecoder implements IUserTokenDecoder {
  constructor(public fakeUser: User) {}

  decode(_token: string): User {
    return this.fakeUser;
  }
}
