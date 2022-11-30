import { expect } from 'chai';
import GetUserTransactionsController from '../../../../src/core/controllers/GetUserTransactionsController';
import IRequest from '../../../../src/core/interfaces/controller/IRequest';
import MockGetUserTransactionsService from './mocks/MockGetUserTransactionsService';
import { transaction, user } from '../services/mocks/data';

describe('Get user transactions controller', function () {
  const mockGetUserTransactionsService = new MockGetUserTransactionsService([transaction]);
  const getUserTransactionsController = new GetUserTransactionsController(mockGetUserTransactionsService);

  it('should return the transactions and an ok status code', async function () {
    const request: IRequest = { payload: { userDTO: user.toDTO() }, query: {}, params: {} };

    const result = await getUserTransactionsController.handle(request);

    expect(result).to.be.deep.equal({
      statusCode: 200,
      data: [transaction.toDTO()],
    });
  });
});
