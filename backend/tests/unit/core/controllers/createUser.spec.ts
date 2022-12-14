import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import CreateUserController from '../../../../src/core/controllers/CreateUserController';
import MockCreateUserService from './mocks/MockCreateUserService';
import IRequest from '../../../../src/core/interfaces/controller/IRequest';
import RequiredPayloadNotProvidedError from '../../../../src/core/controllers/errors/RequiredPaylodNotProvidedError';

chai.use(chaiAsPromised);

describe('Create user controller', function () {
  const mockCreateUserService = new MockCreateUserService();
  const createUserController = new CreateUserController(mockCreateUserService);

  it('should return an user and a created status code', async function () {
    const request: IRequest = {
      payload: { username: 'username', password: 'Abc12345' },
      params: {},
      query: {},
    };
    const result = await createUserController.handle(request);

    expect(result).to.be.deep.equal({ statusCode: 201, data: { token: 'fake_token' } });
  });

  it('should thrown an error when the username is not provided', async function () {
    const request: IRequest = { payload: { password: 'Abc12345' }, params: {}, query: {} };

    await expect(createUserController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED' });
  });

  it('should thrown an error when the password is not provided', async function () {
    const request: IRequest = { payload: { username: 'username' }, params: {}, query: {} };

    await expect(createUserController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED' });
  });
});
