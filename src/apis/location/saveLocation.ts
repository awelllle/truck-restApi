import { FnController } from 'app/routeHandler'
import { FnSaveLocation } from 'services/location/saveLocation'
import utils from 'utils'

interface Dependencies {
  save: FnSaveLocation
}

const createSaveLocationController = ({ save }: Dependencies): FnController => {
  return async (req, res) => {
    const { truck, coordinates } = req.body
    const { result: locations, error } = await save(truck, coordinates)

    if (error) {
      return utils.sendErrorResponse(res, {}, error)
    }

    return utils.sendSuccessResponse(
      res,
      { locations },
      'Location has been saved!'
    )
  }
}
export default createSaveLocationController
