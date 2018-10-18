import { IMeasureModel } from '../models/Measure';

export interface IArduino {
  measures: [IMeasureModel]
  name: String
  location: String
  createdAt: Date
  updatedAt: Date
}