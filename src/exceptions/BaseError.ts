export class BaseError extends Error {
  public httpCode: number

  constructor(message: string, httpCode: number = 500) {
    super(message)

    this.httpCode = httpCode
  }
}