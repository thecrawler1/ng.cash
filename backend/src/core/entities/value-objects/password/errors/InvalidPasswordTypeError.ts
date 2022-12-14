import BadRequestError from "@core/errors/BadRequestError";

export default class InvalidPasswordTypeError extends BadRequestError {
  constructor() {
    super('The password must be a string', 'INVALID_PASSWORD_TYPE');
  }
}
