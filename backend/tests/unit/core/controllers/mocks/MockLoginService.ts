import Password from '../../../../../src/core/entities/value-objects/password';
import Username from '../../../../../src/core/entities/value-objects/username';
import ILoginService from '../../../../../src/core/interfaces/services/ILoginService';

export default class MockLoginService implements ILoginService {
  constructor(public fakeToken = 'fake_token') {}

  async perform(_username: Username, _password: Password): Promise<{ token: string }> {
    return { token: this.fakeToken };
  }
}
