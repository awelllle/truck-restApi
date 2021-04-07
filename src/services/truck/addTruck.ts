import { ITruckModel } from 'data-access/mongodb'
import { ITruckSchema } from 'data-access/mongodb/models/truck'
import utils from 'utils'
import { IServiceResponse } from 'utils/handleResult'
import randomstring from 'randomstring'

type IDependencies = ITruckModel

export type FnAddTruck = (
  brand: string,
  description: string,
  features: string,
  image: string,
  inspected: string,
  location: string,
  truckModel: string,
  price: string,
  transmission: string,
  trips: string,
  year: string,
  userId: string
) => Promise<IServiceResponse<ITruckSchema | null>>

const createAddTruck = ({ Truck }: IDependencies): FnAddTruck => {
  return async (
    brand,
    description,
    features,
    image,
    inspected,
    location,
    truckModel,
    price,
    transmission,
    trips,
    year,
    userId
  ) => {
    try {
      const id = randomstring.generate({
        length: 10,
        charset: 'numeric'
      })

      const newTruck = new Truck({
        id,
        brand,
        description,
        features,
        image,
        inspected,
        location,
        truckModel,
        price,

        transmission,
        trips,
        year,
        userId
      })
      await newTruck.save()

      if (!newTruck) {
        return utils.newServiceResponse(
          null,
          'Could not save truck. Please try again'
        )
      }
      return utils.newServiceResponse(newTruck)
    } catch (error) {
      console.error(error)
      return utils.newServiceResponse(
        null,
        'Something went wrong, please try again'
      )
    }
  }
}

export default createAddTruck
