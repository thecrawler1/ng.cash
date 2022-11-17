import User from '../entities/User';
import Password from '../entities/value-objects/password';
import Username from '../entities/value-objects/username';
import UsernameIsBeingUsedError from './errors/UsernameIsBeingUsedError';
import ICreateUserAndAccountRepository from '../interfaces/repositories/ICreateUserAndAccountRepository';
import ICreateUserService from '../interfaces/services/ICreateUserService';
import IHashGenerator from '../interfaces/services/IHashGenerator';
import ICheckIfUsernameIsBeingUsedRepository from '../interfaces/repositories/ICheckIfUsernameIsBeingUsedRepository';

export default class CreateUserService implements ICreateUserService {
  constructor(
    private createUserAndAccount: ICreateUserAndAccountRepository,
    private checkIfUsernameIsBeingUsed: ICheckIfUsernameIsBeingUsedRepository,
    private hashGenerator: IHashGenerator,
  ) {}

  async perform(username: Username, password: Password): Promise<User> {
    await this.validateIfUsernameIsBeingUsed(username);

    const passwordHash: string = await this.hashGenerator.generate(password);

    return this.createUserAndAccount.perform(username, passwordHash);
  }

  private async validateIfUsernameIsBeingUsed(username: Username): Promise<void> {
    const isBeingUsed: boolean = await this.checkIfUsernameIsBeingUsed.perform(username);

    if (isBeingUsed) throw new UsernameIsBeingUsedError();
  }
}
