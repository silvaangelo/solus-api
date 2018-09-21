import { Arduino } from '../models/Arduino';
import { validationResult } from 'express-validator/check';
import { save, list as getAll, get as retrieve, remove as removeFromDatabase } from '../repositories/arduinoRepository'
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

    const arduino = new Arduino({
      name: req.body.name,
      location: req.body.location
    })
  
    await save(arduino)
  
    return res.json(arduino)
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

    const arduino = await retrieve(req.params.id)

    if(!arduino) {
      throw new ResourceNotFoundError(`Register ${req.params.id} not found for arduino.`)
    }

    return res.json({
      success: true,
      data: arduino
    })
  } catch(err) {
    return next(err)
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

    const arduino = new Arduino({
      name: req.body.name,
      location: req.body.location
    })
    
    return res.json({
      success: true,
      message: `Register ${req.params.id} updated with success.`,
      data: await save(arduino, req.params.id)
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