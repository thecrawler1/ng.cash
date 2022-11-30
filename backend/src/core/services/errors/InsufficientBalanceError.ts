import UnauthorizedError from '@core/errors/UnauthorizedError';

export default class InsufficientBalanceError extends UnauthorizedError {
  constructor() {
    super('The balance is insufficient', 'INSUFFICIENT_BALANCE');
  }
}
