import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  errors: Array<Object>
  
  constructor(message: string = "Invalid request, please check your request again.", errors: Array<Object>) {
    super(message, 400)

    this.errors = errors
  }
}