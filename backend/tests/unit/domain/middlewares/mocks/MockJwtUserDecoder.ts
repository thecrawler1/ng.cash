import User from '@domain/entities/User';
import IJwtUserDecoder from '@domain/interfaces/middleware/IJwtUserDecoder';

export default class MockJwtUserDecoder implements IJwtUserDecoder {
  constructor(public fakeUser: User) {}

  decode(_token: string): User {
    return this.fakeUser;
  }
}
