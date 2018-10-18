import * as bcrypt from 'bcryptjs'
import { User } from '../models/User';
import { validationResult } from 'express-validator/check';
import { save, list as getAll, get as retrieve, remove as removeFromDatabase } from '../repositories/userRepository';
import { createJWToken } from '../auth'
import { ValidationError } from '../exceptions/ValidationError';
import { ResourceNotFoundError } from '../exceptions/ResourceNotFoundError';

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      throw new ValidationError("Invalid request, please check errors and try again.", errors.array({
        onlyFirstError: true
      }))
    }

    const user = new User({
      name: req.body.name,
      email: req.body.email,
      password: await bcrypt.hash(req.body.password, 12)
    })
  
    await save(user)
  
    return res.json(user)
  } catch(err) {
    return next(err)
  }  
}

export const list = async (req, res, next) => {
  try {
    return res.json({
      success: true,
      data: await getAll()
    })
  } catch(err) {
    return next(err)
  }  
}

export const get = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      throw new ValidationError("Invalid request, please check errors and try again.", errors.array({
        onlyFirstError: true
      }))
    }

    const user = await retrieve({
      id: req.params.id
    });

    if(!user) {
      throw new ResourceNotFoundError(`Register ${req.params.id} not found for User.`)
    }

    return res.json({
      success: true,
      data: user
    })
  } catch(err) {
    return next(err)
  }
}

export const login = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      throw new ValidationError("Invalid request, please check errors and try again.", errors.array({
        onlyFirstError: true
      }));
    }

    const user = await retrieve({
      email: req.body.email
    });

    const passwordIsCorrect: boolean = await bcrypt.compare(req.body.password, user.password);

    if(!passwordIsCorrect) {
      throw new ValidationError("Invalid request, please check errors and try again.", [{
        location: 'body',
        param: 'password',
        msg: 'Wrong password'
      }]);
    }

    return res.json({
      success: true,
      data: user,
      token: await createJWToken(user)
    });
  } catch(err) {
    return next(err);
  }
}

export const update = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      throw new ValidationError("Invalid request, please check errors and try again.", errors.array({
        onlyFirstError: true
      }))
    }

    let data: any = {
      name: req.body.name,
      email: req.body.email
    };

    if(req.body.password) {
      data.password = await bcrypt.hash(req.body.password, 12);
    }

    const user = new User(data)
    
    return res.json({
      success: true,
      message: `Register ${req.params.id} updated with success.`,
      data: await save(user, req.params.id)
    })
  } catch(err) {
    return next(err)
  }
}

export const remove = async (req, res, next) => {
  try {
    return res.json(await removeFromDatabase(req.params.id))
  } catch(err) {
    return next(err)
  }
}