import { Arduino } from '../models/Arduino'
import { IArduinoModel } from '../models/Arduino'
import { ResourceNotFoundError } from '../exceptions/ResourceNotFoundError';

export const update = async(id: string, arduino: IArduinoModel) => {
  const arduinoFromDatabase = await get(id)

  arduinoFromDatabase.set({
    name: arduino.name,
    location: arduino.location
  })

  return save(arduinoFromDatabase)
}

export const save = async (arduino: IArduinoModel, id: string = null) => {
  if(id) {
    // update model
    return await update(id, arduino)
  }

  await arduino.save()

  return arduino
}

export const list = async () => await Arduino.find({}, {
  'measures': false
}).exec()

export const get = async (id) => {
  const arduino = await Arduino.findById(id, {
    'measures': false
  }).exec()

  if(!arduino) {
    throw new ResourceNotFoundError(`Cannot found register ${id} for Arduino.`);
  }

  return arduino
}

export const remove = async (id) => {
  const arduino = await get(id)

  if(!arduino) {
    throw new ResourceNotFoundError(`Cannot found register ${id} for Arduino.`);
  }

  return await arduino.remove()  
}