export class AuthBadRequestException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = AuthBadRequestException.name;
  }
}
