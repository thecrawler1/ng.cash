export default abstract class HttpError extends Error {
  private readonly _httpStatusCode: number;
  private readonly _messageCode: string;

  // The message should only be used for debugging purposes
  // The messageCode must be used by the frontend to display the appropriate message to the user
  constructor(httpStatusCode: number, message: string, messageCode: string) {
    super(message);

    this._httpStatusCode = httpStatusCode;
    this._messageCode = messageCode;
    this.name = 'HttpError';
  }

  get statusCode(): number {
    return this._httpStatusCode;
  }

  get messageCode(): string {
    return this._messageCode;
  }
}
