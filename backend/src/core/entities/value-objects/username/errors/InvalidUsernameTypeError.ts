import BadRequestError from "@core/errors/BadRequestError";

export default class InvalidUsernameTypeError extends BadRequestError {
  constructor() {
    super('The username must be a string', 'INVALID_USERNAME_TYPE');
  }
}
