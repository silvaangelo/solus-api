export class BaseError extends Error {
  httpCode: number

  constructor(message: string, httpCode: number = 500) {
    super(message)

    this.httpCode = httpCode
  }
}