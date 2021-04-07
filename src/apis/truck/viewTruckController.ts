import { FnController } from 'app/routeHandler'
import { FnViewTruck } from 'services/truck/viewTruck'
import utils from 'utils'

interface Dependencies {
  viewTruck: FnViewTruck
}

const createViewTruckController = ({
  viewTruck
}: Dependencies): FnController => {
  return async (req, res) => {
    const { id } = req.params
    const { result: candidates, error } = await viewTruck(id)

    if (error) {
      return utils.sendErrorResponse(res, {}, error)
    }

    return utils.sendSuccessResponse(res, { candidates }, 'Here you go!')
  }
}
export default createViewTruckController
