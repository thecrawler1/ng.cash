import IValidateTokenService from '@domain/interfaces/services/IValidateTokenService';
import IUserTokenDecoder from '@domain/interfaces/token-manager/IUserTokenDecoder';

export default class ValidateTokenService implements IValidateTokenService {
  constructor(private userTokenDecoder: IUserTokenDecoder) {}

  perform(token: string): boolean {
    try {
      this.userTokenDecoder.decode(token);
      return true;
    } catch (error) {
      return false;
    }
  }
}
