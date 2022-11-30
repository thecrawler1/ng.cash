import CreateUserController from '@core/controllers/CreateUserController';
import CreateUserService from '@core/services/CreateUserService';
import HashGenerator from '@infrastructure/password-hash-manager/bcrypt/HashGenerator';
import CheckIfUsernameIsBeingUsedRepository from '@infrastructure/repositories/sequelize/CheckIfUsernameIsBeingUsedRepository';
import CreateUserAndAccountRepository from '@infrastructure/repositories/sequelize/CreateUserAndAccountRepository';
import UserTokenEncoder from '@infrastructure/token-manager/UserTokenEncoder';

export default abstract class CreateUserControllerFactory {
  static make(): CreateUserController {
    const createUserAndAccountRepository = new CreateUserAndAccountRepository();
    const checkIfUsernameIsBeingUsedRepository = new CheckIfUsernameIsBeingUsedRepository();
    const hashGenerator = new HashGenerator();
    const userTokenEncoder = new UserTokenEncoder();
    const createUserService = new CreateUserService(
      createUserAndAccountRepository,
      checkIfUsernameIsBeingUsedRepository,
      hashGenerator,
      userTokenEncoder,
    );

    return new CreateUserController(createUserService);
  }
}
