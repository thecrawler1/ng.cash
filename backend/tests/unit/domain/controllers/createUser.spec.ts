import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import CreateUserController from '@domain/controllers/CreateUserController';
import MockCreateUserService from './mocks/MockCreateUserService';
import { user } from '../services/mocks/data';
import IRequest from '@domain/interfaces/controller/IRequest';
import RequiredPayloadNotProvidedError from '@domain/controllers/errors/RequiredPaylodNotProvidedError';

chai.use(chaiAsPromised);

describe('Create user controlle', function () {
  const mockCreateUserService = new MockCreateUserService(user);
  const createUserController = new CreateUserController(mockCreateUserService);

  it('should return an user and a created status code', async function () {
    const request: IRequest = {
      payload: { username: 'username', password: 'Abc12345' },
      params: {},
      query: {},
    };
    const result = await createUserController.handle(request);

    expect(result).to.be.deep.equal({ statusCode: 201, data: user.toDTO() });
  });

  it('should thrown an erro when the username is not provided', async function () {
    const request: IRequest = { payload: { password: 'Abc12345' }, params: {}, query: {} };

    await expect(createUserController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED' });
  });

  it('should thrown an erro when the password is not provided', async function () {
    const request: IRequest = { payload: { username: 'username' }, params: {}, query: {} };

    await expect(createUserController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED' });
  });
});