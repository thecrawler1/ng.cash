import User from '@core/entities/User';
import Account from '@core/entities/Account';
import Password from '@core/entities/value-objects/password';
import Username from '@core/entities/value-objects/username';
import UsernameIsBeingUsedError from './errors/UsernameIsBeingUsedError';
import ICreateUserAndAccountRepository from '@core/interfaces/repositories/ICreateUserAndAccountRepository';
import ICreateUserService from '@core/interfaces/services/ICreateUserService';
import IHashGenerator from '@core/interfaces/password-hash-manager/IHashGenerator';
import ICheckIfUsernameIsBeingUsedRepository from '@core/interfaces/repositories/ICheckIfUsernameIsBeingUsedRepository';
import IUserTokenEncoder from '@core/interfaces/token-manager/IUserTokenEncoder';

export default class CreateUserService implements ICreateUserService {
  constructor(
    private createUserAndAccount: ICreateUserAndAccountRepository,
    private checkIfUsernameIsBeingUsed: ICheckIfUsernameIsBeingUsedRepository,
    private hashGenerator: IHashGenerator,
    private userTokenEncoder: IUserTokenEncoder,
  ) {}

  async perform(username: Username, password: Password): Promise<{ token: string }> {
    await this.validateIfUsernameIsBeingUsed(username);

    const passwordHash: string = await this.hashGenerator.generate(password);
    const user: User = await this.createUserAndAccount.perform(username, passwordHash, Account.INITIAL_BALANCE);
    const token = this.userTokenEncoder.encode(user);

    return { token };
  }

  private async validateIfUsernameIsBeingUsed(username: Username): Promise<void> {
    const isBeingUsed: boolean = await this.checkIfUsernameIsBeingUsed.perform(username);

    if (isBeingUsed) throw new UsernameIsBeingUsedError();
  }
}
