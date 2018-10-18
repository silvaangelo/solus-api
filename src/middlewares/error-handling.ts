import { env } from '../config'
import { BaseError } from '../exceptions/BaseError';
import { ServerGenericError } from '../exceptions/ServerGenericError';
import { ValidationError } from '../exceptions/ValidationError';

const errorHandlingMiddleware = (err, req, res, next) => {
  console.log(err.message)
  console.log(err.stack)

  if (env != 'development') {
    let toReturn = {
      success: false,
      message: null
    }

    if (!(err instanceof BaseError)) {
      return errorHandlingMiddleware(new ServerGenericError(err.message), req, res, next);
    }

    if (err instanceof ValidationError) {
      toReturn["errors"] = err.errors;
    }

    toReturn.message = err.message;

    return res.status(err.httpCode || 500).json(toReturn);
  } else {
    return res.json('ERRO')
  }
}

export default errorHandlingMiddleware