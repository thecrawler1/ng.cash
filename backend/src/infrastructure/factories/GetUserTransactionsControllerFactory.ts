import GetUserTransactionsController from '@domain/controllers/GetUserTransactionsController';
import GetUserTransactionsService from '@domain/services/GetUserTransactionsService';
import GetTransactionByAccountIdRepository from '@infrastructure/repositories/sequelize/GetTransactionsByAccountIdRepository';

export default abstract class GetUserTransactionsControllerFactory {
  static make(): GetUserTransactionsController {
    const getTransactionByAccountIdRepository = new GetTransactionByAccountIdRepository();
    const getUserTransactionsService = new GetUserTransactionsService(getTransactionByAccountIdRepository);

    return new GetUserTransactionsController(getUserTransactionsService);
  }
}
