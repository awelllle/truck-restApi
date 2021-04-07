import { ITruckModel } from 'data-access/mongodb'
import { ITruckSchema } from 'data-access/mongodb/models/truck'
import utils from 'utils'
import { IServiceResponse } from 'utils/handleResult'

type IDependencies = ITruckModel

export type FnViewTruck = (
  id: string
) => Promise<IServiceResponse<ITruckSchema | null>>

const createViewruck = ({ Truck }: IDependencies): FnViewTruck => {
  return async (id) => {
    const truck = await Truck.findOne({ id })

    if (truck) {
      return utils.newServiceResponse(truck)
    }

    return utils.newServiceResponse(
      null,
      "We can't seem to find that truckk, please check the Id again "
    )
  }
}

export default createViewruck
