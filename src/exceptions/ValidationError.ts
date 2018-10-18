import { BaseError } from './BaseError';

export class ValidationError extends BaseError {
  errors: Array<Object>
  
  constructor(message: string = "Invalid request, please check your request again.", errors: Array<Object>, httpCode: number = 400) {
    super(message, httpCode)

    this.errors = errors
  }
}