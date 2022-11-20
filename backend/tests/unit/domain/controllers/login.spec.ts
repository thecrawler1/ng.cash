import RequiredPayloadNotProvidedError from '../../../../src/domain/controllers/errors/RequiredPaylodNotProvidedError';
import LoginController from '../../../../src/domain/controllers/LoginController';
import IRequest from '../../../../src/domain/interfaces/controller/IRequest';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import MockLoginService from './mocks/MockLoginService';

chai.use(chaiAsPromised);

describe('Login controller', function () {
  const mockLoginService = new MockLoginService();
  const loginController = new LoginController(mockLoginService);

  it('should return an token and an ok status code', async function () {
    const request: IRequest = {
      payload: { username: 'username', password: 'Abc12345' },
      query: {},
      params: {},
    };
    const result = await loginController.handle(request);

    expect(result).to.be.deep.equal({
      statusCode: 200,
      data: { token: mockLoginService.fakeToken },
    });
  });

  it('should throw an error when the username is not provided', async function () {
    const request: IRequest = { payload: { password: 'Abc12345' }, query: {}, params: {} };

    await expect(loginController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED'});
  });

  it('should throw an error when the password is not provided', async function () {
    const request: IRequest = { payload: { username: 'username' }, query: {}, params: {} };

    await expect(loginController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED'});
  });
});
