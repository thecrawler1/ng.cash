import GetUserBalanceController from '@core/controllers/GetUserBalanceController';
import GetUserBalanceService from '@core/services/GetUserBalanceService';
import GetAccountByIdRepository from '@infrastructure/repositories/sequelize/GetAccountByIdRepository';

export default abstract class GetUserBalanceControllerFactory {
  static make(): GetUserBalanceController {
    const getAccountByIdRepository = new GetAccountByIdRepository();
    const getUserBalanceService = new GetUserBalanceService(getAccountByIdRepository);
    
    return new GetUserBalanceController(getUserBalanceService);
  }
}
