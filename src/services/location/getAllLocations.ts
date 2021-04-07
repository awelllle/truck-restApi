import { ILocationModel } from 'data-access/mongodb'
import { ILocationSchema } from 'data-access/mongodb/models/location'
import utils from 'utils'
import { IServiceResponse } from 'utils/handleResult'

type IDependencies = ILocationModel

export type FnGetAllLocations = (
  id: string
) => Promise<IServiceResponse<ILocationSchema | null>>

const getAllLocations = ({ Location }: IDependencies): FnGetAllLocations => {
  return async (id) => {
    const truckLocations = await Location.findOne({ id })

    if (truckLocations) {
      return utils.newServiceResponse(truckLocations)
    }
    return utils.newServiceResponse(null, 'No Locations found')
  }
}

export default getAllLocations
