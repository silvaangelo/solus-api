import { Document, Schema, Model, model } from 'mongoose'
import { IMeasure } from '../interfaces/IMeasure'

export interface IMeasureModel extends IMeasure, Document {
    
}

export var MeasureSchema: Schema = new Schema({
  uvRay: Number,
  rainfall: Number,
  soilMoisture: Number,
  airMoisture: Number,
  temperature: Number,
  arduinoTemperature: Number,
  sunlight: Number,
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
