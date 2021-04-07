/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
import { FnController } from 'app/routeHandler'
import { FnEditTruck } from 'services/truck/editTruck'
import utils from 'utils'

interface Dependencies {
  editTruck: FnEditTruck
}

const createEditTruckController = ({
  editTruck
}: Dependencies): FnController => {
  return async (req, res) => {
    const {
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
    } = req.body

    const { result: vehicle, error } = await editTruck(
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
    )

    if (error) {
      return utils.sendErrorResponse(res, {}, error)
    }

    return utils.sendSuccessResponse(
      res,
      { vehicle },
      'Truck details have been updated'
    )
  }
}
export default createEditTruckController
