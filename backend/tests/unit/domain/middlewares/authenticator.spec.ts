import IRequest from '@domain/interfaces/middleware/IRequest';
import AuthenticatorMiddleware from '@domain/middlewares/AuthenticatorMiddleware';
import TokenNotProvidedError from '@domain/middlewares/errors/TokenNotProvidedError';
import chai, { expect } from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { user } from '../services/mocks/data';
import MockJwtUserDecoder from './mocks/MockJwtUserDecoder';

chai.use(chaiAsPromised);

describe('Authenticator middleware', function () {
  const mockJwtUserDecoder = new MockJwtUserDecoder(user);
  const authenticatorMiddleware = new AuthenticatorMiddleware(mockJwtUserDecoder);

  it('should return an user', function () {
    const request: IRequest = { token: 'fake_token' };

    const result = authenticatorMiddleware.handle(request);

    expect(result).to.be.deep.equal({ body: { userDTO: user.toDTO() } });
  });

  it('should thrown an error when the token was not provided', function () {
    const tryAuth = () => authenticatorMiddleware.handle({} as any);

    expect(tryAuth).to.throw(TokenNotProvidedError).and.contain({
      messageCode: 'TOKEN_NOT_PROVIDED',
    });
  })
});
