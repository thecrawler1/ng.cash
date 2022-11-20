import User from '../../../../../src/domain/entities/User';
import IUserTokenEncoder from '../../../../../src/domain/interfaces/token-manager/IUserTokenEncoder';

export default class MockUserTokenEncoder implements IUserTokenEncoder {
  constructor(public fakeToken = 'fake_token') {}

  encode(_user: User, _expiresIn: number): string {
    return this.fakeToken;
  }
}
