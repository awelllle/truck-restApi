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
  price?: number
  transmission?: string
  trips?: string
  year?: string
  userId?: string
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
    price: Number,
    transmission: String,
    trips: String,
    year: String,
    userId: String
  })

  return TruckSchema
}

export default newTruckSchema
