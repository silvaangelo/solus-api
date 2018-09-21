import { MeasureSchema } from './Measure';
import { IArduino } from '../interfaces/IArduino'
import { Document, Schema, Model, model } from 'mongoose'

export interface IArduinoModel extends IArduino, Document {
    
}

export var ArduinoSchema: Schema = new Schema({
    name: String,
    location: String,
    measures: [MeasureSchema],
    createdAt: Date,
    updatedAt: Date
})

ArduinoSchema.pre<IArduinoModel>('save', function(next) {
    const now = new Date()

    this.updatedAt = now

    if(!this.createdAt) {
        this.createdAt = now
    }

    next()
})

export const Arduino: Model<IArduinoModel> = model<IArduinoModel>("Arduino", ArduinoSchema)
