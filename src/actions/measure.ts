import { Measure } from '../models/Measure'
import { save } from '../repositories/measureRepository'
import { validationResult } from 'express-validator/check';
import { ValidationError } from '../exceptions/ValidationError';
import { properties } from '../interfaces/IMeasure';
import Mutator from '../measureMutators/Mutator';
import MutantFactory from '../factories/MutantFactory';

export const transformValues = data => {
  const mutator = new Mutator();

  Object.keys(data).map(prop => {
    if(properties.includes(prop)) {
      mutator.setMutant(MutantFactory.getMutant(prop));

      data[prop] = mutator.mutate(data[prop]);
    }
  });

  return data;
}

export const create = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    
    if (!errors.isEmpty()) {
      throw new ValidationError("Invalid request, please check errors and try again.", errors.array({
        onlyFirstError: true
      }))
    }

    const data = await transformValues(req.body);

    const measure = new Measure(data);

    save(measure, req.body.arduinoId);

    return res.json({
      success: true
    });
  } catch(err) {
    next(err)
  }
}