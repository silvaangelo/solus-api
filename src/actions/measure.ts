import { Measure } from '../models/Measure'
import { save } from '../repositories/measureRepository'
import { validationResult } from 'express-validator/check';
import { ValidationError } from '../exceptions/ValidationError';

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      throw new ValidationError("Invalid request, please check errors and try again.", errors.array({
        onlyFirstError: true
      }))
    }

    const measure = new Measure(req.body);

    return res.json({
      success: true,
      data: await save(measure, req.body.arduinoId)
    })
  } catch(err) {
    next(err)
  }
}