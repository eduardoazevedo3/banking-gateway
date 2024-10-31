export class RecordValidationException {
  message: string | string[];

  constructor(message: string | string[]) {
    this.message = message;
  }
}
