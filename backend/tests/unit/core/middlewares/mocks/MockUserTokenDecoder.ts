import User from '../../../../../src/core/entities/User';
import IUserTokenDecoder from '../../../../../src/core/interfaces/token-manager/IUserTokenDecoder';

export default class MockUserTokenDecoder implements IUserTokenDecoder {
  constructor(public fakeUser: User) {}

  decode(_token: string): User {
    return this.fakeUser;
  }
}
