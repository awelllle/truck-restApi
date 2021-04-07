import { ILocationService } from 'services/location'
import { FnController } from 'app/routeHandler'
import createSaveLocationController from './saveLocation'

import createGetAllController from './getAllLocations'

interface Dependecies {
  locationService: ILocationService
}

interface ILocationApi {
  saveLocationController: FnController
  getAllController: FnController
}
const createLocationApi = ({ locationService }: Dependecies): ILocationApi => {
  const { getAll, save } = locationService

  const saveLocationController = createSaveLocationController({
    save
  })

  const getAllController = createGetAllController({
    getAll
  })

  return Object.freeze({
    saveLocationController,
    getAllController
  })
}

export default createLocationApi
