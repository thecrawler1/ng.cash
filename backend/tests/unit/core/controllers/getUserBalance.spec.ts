import { expect } from 'chai';
import GetUserBalanceController from '../../../../src/core/controllers/GetUserBalanceController';
import IRequest from '../../../../src/core/interfaces/controller/IRequest';
import MockGetUserBalanceService from './mocks/MockGetUserBalanceService';
import { account, user } from '../services/mocks/data';

describe('Get user balance controller', function () {
  const mockGetUserBalanceService = new MockGetUserBalanceService(account.balance);
  const getUserBalanceController = new GetUserBalanceController(mockGetUserBalanceService);

  it('should return a balance and an ok status code', async function () {
    const request: IRequest = { payload: { userDTO: user.toDTO() }, query: {}, params: {} };
    const result = await getUserBalanceController.handle(request)

    expect(result).to.be.deep.equal({
      statusCode: 200,
      data: { balance: account.balance.value }
    });
  });
});
