import { IArduinoModel } from '../models/Arduino';

export const columns: any = [
  'uvRay',
  'rainfall',
  'sunCapability',
  'humidity',
  'ambienceTemperature',
  'temperatureHumidity',
  'createdAt',
  'lightIntensity'
];

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
