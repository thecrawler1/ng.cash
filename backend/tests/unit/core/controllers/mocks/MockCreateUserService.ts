import Password from '../../../../../src/core/entities/value-objects/password';
import Username from '../../../../../src/core/entities/value-objects/username';
import ICreateUserService from '../../../../../src/core/interfaces/services/ICreateUserService';

export default class MockCreateUserService implements ICreateUserService {
  constructor(public fakeToken = 'fake_token') {}

  async perform(_username: Username, _password: Password): Promise<{ token: string }> {
    return { token: this.fakeToken };
  }
}
