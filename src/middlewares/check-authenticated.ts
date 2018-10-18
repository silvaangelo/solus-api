import * as jwt from 'jsonwebtoken'
import { get as findUser } from '../repositories/userRepository'
import { ValidationError } from '../exceptions/ValidationError'
import { jwt_secret } from '../config';

const ensureAuthenticated = (req, res, next) => {
  try {
    if (!req.headers.authorization) {
      throw new ValidationError('Token is missing', [{
        location: 'headers',
        param: 'Authorization',
        msg: 'Token is missing'
      }], 401);
    }
  
    const token = req.headers.authorization.split(' ')[1];
  
    let payload = null;
  
    try {
      payload = jwt.verify(token, jwt_secret);
    } catch (err) {
      throw new ValidationError('Token is invalid', [{
        location: 'headers',
        param: 'Authorization',
        msg: 'Token is invalid'
      }], 401);
    }

    if (Math.floor(Date.now() / 1000) > payload.exp) {
      throw new ValidationError('Token expired', [{
        location: 'headers',
        param: 'Authorization',
        msg: 'Token expired'
      }], 401);
    }
  
    // check if the user exists
    findUser({
      email: payload.data.email
    });
    
    req.user = payload.data;
  
    return next();
  } catch (err) {
    return next(err);
  }
};

export default ensureAuthenticated