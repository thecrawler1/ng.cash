import User from '@domain/entities/User';
import IJwtUserEncoder from '@domain/interfaces/services/IJwtUserEncoder';

export default class MockJwtUserEncoder implements IJwtUserEncoder {
  constructor(public fakeToken = 'fake_token') {}

  encode(_user: User, _expiresIn: number): string {
    return this.fakeToken;
  }
}
