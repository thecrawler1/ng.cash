import User from '../entities/User';
import Password from '../entities/value-objects/password';
import Username from '../entities/value-objects/username';
import UsernameIsBeingUsedError from './errors/UsernameIsBeingUsedError';
import ICreateUserAndAccountRepository from '../interfaces/repositories/ICreateUserAndAccountRepository';
import ICreateUserService from '../interfaces/services/ICreateUserService';
import IHashGenerator from '@domain/interfaces/password-hash-manager/IHashGenerator';
import ICheckIfUsernameIsBeingUsedRepository from '../interfaces/repositories/ICheckIfUsernameIsBeingUsedRepository';
import IUserTokenEncoder from '@domain/interfaces/token-manager/IUserTokenEncoder';

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
    const user: User = await this.createUserAndAccount.perform(username, passwordHash);
    const token = this.userTokenEncoder.encode(user);

    return { token };
  }

  private async validateIfUsernameIsBeingUsed(username: Username): Promise<void> {
    const isBeingUsed: boolean = await this.checkIfUsernameIsBeingUsed.perform(username);

    if (isBeingUsed) throw new UsernameIsBeingUsedError();
  }
}
