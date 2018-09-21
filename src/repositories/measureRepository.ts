import { IMeasureModel } from '../models/Measure'
import { get, save as saveArduino } from './arduinoRepository'

export const save = async (measure: IMeasureModel, arduinoId: string) => {
  const arduino = await get(arduinoId)

  await arduino.measures.push(measure)
  saveArduino(arduino)

  return measure
}