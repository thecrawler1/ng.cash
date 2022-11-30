import MakeTransferController from '@core/controllers/MakeTransferController';
import GetUserByUsernameRepository from '@infrastructure/repositories/sequelize/GetUserByUsernameRepository';
import GetAccountByIdRepository from '@infrastructure/repositories/sequelize/GetAccountByIdRepository';
import MakeTransferRepository from '@infrastructure/repositories/sequelize/MakeTransferRepository';
import MakeTransferService from '@core/services/MakeTransferService';

export default abstract class MakeTransferControllerFactory {
  static make(): MakeTransferController {
    const getUserByUsernameRepository = new GetUserByUsernameRepository();
    const getAccoutByIdRepository = new GetAccountByIdRepository();
    const makeTransferRepository = new MakeTransferRepository();
    const makeTransferService = new MakeTransferService(
     getUserByUsernameRepository,
     getAccoutByIdRepository,
     makeTransferRepository,
    );

    return new MakeTransferController(makeTransferService);
  }
}
