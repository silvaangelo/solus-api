import { BaseError } from './BaseError';

export class ServerGenericError extends BaseError {
  constructor(message: string = "Error when processing request.") {
    super(message, 500)
  }
}