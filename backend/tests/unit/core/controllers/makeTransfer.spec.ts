import RequiredPayloadNotProvidedError from '../../../../src/core/controllers/errors/RequiredPaylodNotProvidedError';
import MakeTransferController from '../../../../src/core/controllers/MakeTransferController';
import IRequest from '../../../../src/core/interfaces/controller/IRequest';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { transaction, user } from '../services/mocks/data';
import MockMakeTransferService from './mocks/MockMakeTransferService';

chai.use(chaiAsPromised);

describe('Make transfer controller', function () {
  const mockMakeTransferService = new MockMakeTransferService(transaction);
  const makeTransferController = new MakeTransferController(mockMakeTransferService);

  it('should return a transaction and a created status code', async function () {
    const request: IRequest = {
      payload: {
        userDTO: user.toDTO(),
        destinationUsername: 'username',
        amount: 123.45,
      },
      query: {},
      params: {},
    };
    const result = await makeTransferController.handle(request);

    expect(result).to.be.deep.equal({
      statusCode: 201,
      data: transaction.toDTO(),
    });
  });

  it('should thrown an error when the destination username is not provided', async function () {
    const request: IRequest = {
      payload: {
        userDTO: user.toDTO(),
        amount: 123.45,
      },
      query: {},
      params: {},
    };

    await expect(makeTransferController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED'});
  });

  it('should thrown an error when the amount is not provided', async function () {
    const request: IRequest = {
      payload: {
        userDTO: user.toDTO(),
        destinationUsername: 'username',
      },
      query: {},
      params: {},
    };

    await expect(makeTransferController.handle(request))
      .to.be.eventually.rejectedWith(RequiredPayloadNotProvidedError)
      .and.contain({ messageCode: 'REQUIRED_PAYLOAD_NOT_PROVIDED'});
  });
});
