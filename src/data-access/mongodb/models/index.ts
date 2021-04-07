import mongoose, { Model } from 'mongoose'
import { ITruckSchema } from './truck'
import newTruckSchema from './truck'

import { ILocationSchema } from './location'

import newLocationSchema from './location'

let truckSchema: Model<ITruckSchema>
export const getTruckModel = (): mongoose.Model<ITruckSchema> => {
  if (!truckSchema) {
    const TruckSchema = newTruckSchema()
    truckSchema = mongoose.model('Truck', TruckSchema)
  }
  return truckSchema
}

let locationSchema: Model<ILocationSchema>
export const getLocationModel = (): mongoose.Model<ILocationSchema> => {
  if (!locationSchema) {
    const LocationSchema = newLocationSchema()
    locationSchema = mongoose.model('Location', LocationSchema)
  }
  return locationSchema
}
