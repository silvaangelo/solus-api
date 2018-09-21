import { IMeasureModel } from '../models/Measure';

export interface IArduino {
    name: String
    location: String
    measures: Array<IMeasureModel>
    createdAt: Date
    updatedAt: Date
}