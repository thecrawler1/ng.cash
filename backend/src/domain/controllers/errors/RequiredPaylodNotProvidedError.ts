import BadRequestError from '@domain/errors/BadRequestError';

export default class RequiredPayloadNotProvidedError extends BadRequestError {
  constructor() {
    super('Request missing required payload', 'REQUIRED_PAYLOAD_NOT_PROVIDED');
  }
}
