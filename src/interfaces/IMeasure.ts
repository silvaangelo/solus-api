import { IArduinoModel } from '../models/Arduino';

export interface IMeasure {
  arduino: IArduinoModel
  uvRay: Number
  rainfall: Number
  soilMoisture: Number
  airMoisture: Number
  temperature: Number
  arduinoTemperature: Number
  createdAt: Date
  sunlight: Number
}