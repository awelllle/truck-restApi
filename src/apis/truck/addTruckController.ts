import { FnController } from 'app/routeHandler'
import { FnAddTruck } from 'services/truck/addTruck'
import utils from 'utils'

interface Dependencies {
  addTruck: FnAddTruck
}

const createAddTruckController = ({ addTruck }: Dependencies): FnController => {
  return async (req, res) => {
    const {
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
    } = req.body

    const { result: truck, error } = await addTruck(
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
    )
    if (error) {
      return utils.sendErrorResponse(res, {}, error)
    }

    return utils.sendSuccessResponse(
      res,
      { truck },
      'Truck was successfully added'
    )
  }
}
export default createAddTruckController
