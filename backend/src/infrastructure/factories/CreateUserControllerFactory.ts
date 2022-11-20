import CreateUserController from '@domain/controllers/CreateUserController';
import CreateUserService from '@domain/services/CreateUserService';
import HashGenerator from '@infrastructure/password-hash-manager/bcrypt/HashGenerator';
import CheckIfUsernameIsBeingUsedRepository from '@infrastructure/repositories/sequelize/CheckIfUsernameIsBeingUsedRepository';
import CreateUserAndAccountRepository from '@infrastructure/repositories/sequelize/CreateUserAndAccountRepository';

export default abstract class CreateUserControllerFactory {
  static make(): CreateUserController {
    const createUserAndAccountRepository = new CreateUserAndAccountRepository();
    const checkIfUsernameIsBeingUsedRepository = new CheckIfUsernameIsBeingUsedRepository();
    const hashGenerator = new HashGenerator();
    const createUserService = new CreateUserService(
      createUserAndAccountRepository,
      checkIfUsernameIsBeingUsedRepository,
      hashGenerator,
    );

    return new CreateUserController(createUserService);
  }
}
