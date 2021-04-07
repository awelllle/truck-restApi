import { ILocationModel } from 'data-access/mongodb'
import getAllLocations, { FnGetAllLocations } from './getAllLocations'
import saveLocation, { FnSaveLocation } from './saveLocation'

export interface ILocationService {
  getAll: FnGetAllLocations
  save: FnSaveLocation
}

const createLocationService = ({
  Location
}: ILocationModel): ILocationService => {
  const getAll = getAllLocations({
    Location
  })

  const save = saveLocation({
    Location
  })

  return Object.freeze({
    getAll,
    save
  })
}

export default createLocationService
