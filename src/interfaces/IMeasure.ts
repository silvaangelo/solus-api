import { IArduinoModel } from '../models/Arduino';

export interface IMeasure {
  arduino: IArduinoModel
  uvRay: Number
  rainfall: Number
  sunCapability: Number
  humidity: Number
  ambienceTemperature: Number
  temperatureHumidity: Number
  createdAt: Date
  lightIntensity: Number
}