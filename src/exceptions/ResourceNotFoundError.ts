import { BaseError } from './BaseError';

export class ResourceNotFoundError extends BaseError {
  constructor(message: string = "Cannot found the requested resource.") {
    super(message, 404)
  }
}
