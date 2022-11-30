import LoginController from '@core/controllers/LoginController';
import GetUserPasswordHashByUsernameRepository from '@infrastructure/repositories/sequelize/GetUserPasswordHashByUsernameRepository';
import GetUserByUsernameRepository from '@infrastructure/repositories/sequelize/GetUserByUsernameRepository';
import HashComparer from '@infrastructure/password-hash-manager/bcrypt/HashComparer';
import UserTokenEncoder from '@infrastructure/token-manager/UserTokenEncoder';
import LoginService from '@core/services/LoginService';

export default abstract class LoginControllerFactory {
  static make(): LoginController {
    const getUserPasswordHashByUsernameRepository = new GetUserPasswordHashByUsernameRepository();
    const getUserByUsernameRepository = new GetUserByUsernameRepository();
    const hashComparerRepository = new HashComparer();
    const userTokenEncoderRepository = new UserTokenEncoder();
    const loginService = new LoginService(
      getUserPasswordHashByUsernameRepository,
      getUserByUsernameRepository,
      hashComparerRepository,
      userTokenEncoderRepository,
    );

    return new LoginController(loginService);
  }
}
