import IValidateTokenService from '@core/interfaces/services/IValidateTokenService';
import IUserTokenDecoder from '@core/interfaces/token-manager/IUserTokenDecoder';

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
