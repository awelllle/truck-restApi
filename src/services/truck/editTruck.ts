import { ITruckModel } from 'data-access/mongodb'
import { ITruckSchema } from 'data-access/mongodb/models/truck'
import utils from 'utils'
import { IServiceResponse } from 'utils/handleResult'

type IDependencies = ITruckModel

export type FnEditTruck = (
  id: string,
  brand: string,
  description: string,
  features: string,
  inspected: boolean,
  location: string,
  truckModel: string,
  price: string,
  transmission: string,
  year: string,
  coordinates: Array<number>
) => Promise<IServiceResponse<ITruckSchema | null>>
const createEditTruck = ({ Truck }: IDependencies): FnEditTruck => {
  return async (
    id,
    brand,
    description,
    features,
    inspected,
    location,
    truckModel,
    price,
    transmission,
    year,
    coordinates
  ) => {
    try {
      const truck = await Truck.findOne({ id })

      if (!truck) {
        return utils.newServiceResponse(null, 'Cannot find truck.')
      }

      if (brand) {
        truck.brand = brand
      }

      if (description) {
        truck.description = description
      }

      if (features) {
        truck.features = features
      }

      if (inspected) {
        truck.inspected = inspected
      }

      if (location) {
        truck.location = location
      }

      if (truckModel) {
        truck.truckModel = truckModel
      }

      if (price) {
        truck.price = price
      }

      if (transmission) {
        truck.transmission = features
      }

      if (year) {
        truck.year = year
      }

      if (coordinates) {
        truck.coordinates = coordinates
      }

      await truck.save()
      return utils.newServiceResponse(truck)
    } catch (error) {
      return utils.newServiceResponse(
        null,
        'Something went wrong, please try again'
      )
    }
  }
}

export default createEditTruck
