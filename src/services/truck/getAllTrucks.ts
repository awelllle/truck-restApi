import { ITruckModel } from 'data-access/mongodb'
import { ITruckSchema } from 'data-access/mongodb/models/truck'
import utils from 'utils'
import { IServiceResponse } from 'utils/handleResult'

type IDependencies = ITruckModel

export type FnGetAllTrucks = () => Promise<
  IServiceResponse<Array<ITruckSchema> | null>
>

const getAllTrucks = ({ Truck }: IDependencies): FnGetAllTrucks => {
  return async () => {
    const trucks = await Truck.find()

    if (trucks) {
      return utils.newServiceResponse(trucks)
    }
    return utils.newServiceResponse(null, 'No Trucks found')
  }
}

export default getAllTrucks
