import Password from '@domain/entities/value-objects/password';
import Username from '@domain/entities/value-objects/username';
import ILoginService from '@domain/interfaces/services/ILoginService';

export default class MockLoginService implements ILoginService {
  constructor(public fakeToken = 'fake_token') {}

  async perform(_username: Username, _password: Password): Promise<{ token: string }> {
    return { token: this.fakeToken };
  }
}
