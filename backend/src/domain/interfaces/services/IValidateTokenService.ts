export default interface IValidateTokenService {
  perform(token: string): boolean;
}
