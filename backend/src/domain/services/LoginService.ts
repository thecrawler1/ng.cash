import User from '../entities/User';
import Password from '../entities/value-objects/password';
import Username from '../entities/value-objects/username';
import IGetUserByUsernameRepository from '../interfaces/repositories/IGetUserByUsernameRepository';
import IGetUserPasswordHashByUsernameRepository from '../interfaces/repositories/IGetUserPasswordHashByUsernameRepository';
import ILoginService from '../interfaces/services/ILoginService';
import InvalidCredentialsError from './errors/InvalidCredentialsError';
import IHashComparer from '../interfaces/services/IHashComparer';
import IJwtUserEncoder from '../interfaces/services/IJwtUserEncoder';

export default class LoginService implements ILoginService {
  private static readonly TOKEN_EXPIRATION = 24 * 60 * 60; // one day

  constructor(
    private getUserPasswordHashByUsername: IGetUserPasswordHashByUsernameRepository,
    private getUserByUsername: IGetUserByUsernameRepository,
    private hashComparer: IHashComparer,
    private jwtUserEncoder: IJwtUserEncoder,
  ) {}

  async perform(username: Username, password: Password): Promise<{ token: string }> {
    await this.validatePassword(username, password);

    const user: User = await this.getUserByUsername.perform(username);
    const token: string = this.jwtUserEncoder.encode(user, LoginService.TOKEN_EXPIRATION);

    return { token };
  }

  private async validatePassword(username: Username, password: Password): Promise<void> {
    const passwordHash: string = await this.getUserPasswordHashByUsername.perform(username);
    const isValid: boolean = await this.hashComparer.compare(password, passwordHash);

    if (!isValid) throw new InvalidCredentialsError();
  }
}
