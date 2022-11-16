import BadRequestError from '../../errors/BadRequestError';

export default class InvalidIdTypeError extends BadRequestError {
  constructor() {
    super('The id must be a integer', 'INVALID_ID_TYPE');

    this.name = 'InvalidIdTypeError';
  }
}
