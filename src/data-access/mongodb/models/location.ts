import mongoose, { Schema } from 'mongoose'
import { Document } from 'mongoose'

export interface ILocationSchema extends Document {
  truck: string
  coordinates: Array<number>
}

const newLocationSchema = (): Schema<ILocationSchema> => {
  const LocationSchema = new mongoose.Schema({
    truck: String,
    coordinates: {
      type: ['Point'],
      coordinates: []
    }
  })

  LocationSchema.index({ coordinates: '2dsphere' })
  return LocationSchema
}

export default newLocationSchema
