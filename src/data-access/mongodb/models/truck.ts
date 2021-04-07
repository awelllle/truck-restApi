import mongoose, { Schema } from 'mongoose'
import { Document } from 'mongoose'

export interface ITruckSchema extends Document {
  id: string
  brand?: string
  description?: string
  earnings?: string
  features?: string
  image?: string
  inspected?: boolean
  location?: string
  truckModel?: string
  price?: string
  transmission?: string
  trips?: string
  year?: string
  userId?: string

  coordinates: Array<number>
}

const newTruckSchema = (): Schema<ITruckSchema> => {
  const TruckSchema = new mongoose.Schema({
    id: String,
    brand: String,
    description: String,
    earnings: String,
    features: String,
    image: String,
    inspected: Boolean,
    location: String,
    truckModel: String,
    price: String,
    transmission: String,
    trips: String,
    year: String,
    userId: String,
    coordinates: Array
  })

  return TruckSchema
}

export default newTruckSchema
