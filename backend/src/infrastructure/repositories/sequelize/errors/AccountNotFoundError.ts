import NotFoundError from '@domain/errors/NotFoundError';

export default class AccountNotFoundError extends NotFoundError {
  constructor() {
    super('Account not found', 'ACCOUNT_NOT_FOUND');
  }
}
