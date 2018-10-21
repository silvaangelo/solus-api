import { Document, Schema, Model, model } from 'mongoose'
import { IMeasure } from '../interfaces/IMeasure'

export interface IMeasureModel extends IMeasure, Document {
    
}

export var MeasureSchema: Schema = new Schema({
  arduino: { type: Schema.Types.ObjectId, ref: 'Arduino' },  
  uvRay: Number,
  rainfall: Number,
  sunCapability: Number,
  humidity: Number,
  ambienceTemperature: Number,
  temperatureHumidity: Number,
  lightIntensity: Number,
  createdAt: Date
})

MeasureSchema.pre<IMeasureModel>('save', function(next) {
  const now = new Date()

  if(!this.createdAt) {
    this.createdAt = now
  }

  next()
})

export const Measure: Model<IMeasureModel> = model<IMeasureModel>("Measure", MeasureSchema)
