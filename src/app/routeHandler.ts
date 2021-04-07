import express, { Request, Response } from 'express'
import createMongoDb from 'data-access/mongodb'

import createTruckApi from 'apis/truck'
import createTruckService from 'services/truck'

import createLocationService from 'services/location'
import createLocationApi from 'apis/location'

const createRouter = (app: express.Express, baseUrl: string) => {
  const router = express.Router()
  app.use(baseUrl, router)
  return router
}

export type FnController = (req: Request, res: Response) => Promise<void>
const createAppApi = (app: express.Express): void => {
  const { Truck, Location } = createMongoDb()

  const truckService = createTruckService({ Truck })
  const truckApi = createTruckApi({ truckService })

  const locationService = createLocationService({ Location })
  const locationApi = createLocationApi({ locationService })

  /**
   * Truck apis
   */
  const truckRouter = createRouter(app, '/truck')

  truckRouter.get('/', truckApi.getAllController)
  truckRouter.get('/edit', truckApi.editTruckController)
  truckRouter.get('/saveLocation/:id', truckApi.editTruckController)
  truckRouter.put('/add', truckApi.addTruckController)
  truckRouter.get('/view/:id', truckApi.viewTruckController)

  /**
   * Location apis
   */
  const locationRouter = createRouter(app, '/location')

  locationRouter.get('/:id', locationApi.getAllController)
  locationRouter.put('/save', locationApi.saveLocationController)
}
export default createAppApi
