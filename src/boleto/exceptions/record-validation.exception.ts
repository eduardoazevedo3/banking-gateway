export class RecordValidationException extends Error {
  constructor(message: string) {
    super(message);
    this.message = message;
    this.name = RecordValidationException.name;
  }
}
