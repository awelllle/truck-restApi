import { ILocationModel } from 'data-access/mongodb'
import { ILocationSchema } from 'data-access/mongodb/models/location'
import utils from 'utils'
import { IServiceResponse } from 'utils/handleResult'

type IDependencies = ILocationModel

export type FnSaveLocation = (
  truck: string,
  coordinates: Array<number>
) => Promise<IServiceResponse<ILocationSchema | null>>

const saveLocation = ({ Location }: IDependencies): FnSaveLocation => {
  return async (truck, coordinates) => {
    try {
      const newLocation = new Location({
        truck,
        coordinates
      })

      await newLocation.save()

      if (!newLocation) {
        return utils.newServiceResponse(
          null,
          'Could not save review. Please try again'
        )
      }
      return utils.newServiceResponse(newLocation)
    } catch (error) {
      console.error(error)
      return utils.newServiceResponse(
        null,
        'Something went wrong, please try again'
      )
    }
  }
}

export default saveLocation
