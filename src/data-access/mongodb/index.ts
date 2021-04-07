import mongoose, { Model } from 'mongoose'
import config from './config'
import { getLocationModel, getTruckModel } from './models'

import { ITruckSchema } from './models/truck'
import { ILocationSchema } from './models/location'

export interface ITruckModel {
  Truck: Model<ITruckSchema>
}

export interface ILocationModel {
  Location: Model<ILocationSchema>
}

interface Database extends ITruckModel, ILocationModel {}

const createMongoDb = (): Database => {
  const ENV = process.env.NODE_ENV
  let dbUrl = config.dbUrl.dev

  if (ENV === 'production') {
    dbUrl = encodeURI(config.dbUrl.prod)
  }
  const dbName = process.env.DB_NAME

  if (ENV !== 'test') {
    mongoose
      .connect(dbUrl, {
        dbName,
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true
      })
      .then(() => {
        console.log('DB Connected')
      })
      .catch((error: Error) => {
        console.log('DB Error', error)
      })

    mongoose.connection.on('connected', function () {
      console.log(`Mongoose connected to ${dbUrl}`)
    })
    mongoose.connection.on('error', function (err: Error) {
      console.log(`Mongoose connection error: ${err}`)
    })
    mongoose.connection.on('disconnected', function () {
      console.log('Mongoose disconnected')
    })
  }
  mongoose.set('useFindAndModify', false)

  const truckModel = getTruckModel()
  const locationModel = getLocationModel()

  return {
    Truck: truckModel,
    Location: locationModel
  }
}

export default createMongoDb
