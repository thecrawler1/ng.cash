import Password from '../../../../../src/domain/entities/value-objects/password';
import Username from '../../../../../src/domain/entities/value-objects/username';
import ILoginService from '../../../../../src/domain/interfaces/services/ILoginService';

export default class MockLoginService implements ILoginService {
  constructor(public fakeToken = 'fake_token') {}

  async perform(_username: Username, _password: Password): Promise<{ token: string }> {
    return { token: this.fakeToken };
  }
}
