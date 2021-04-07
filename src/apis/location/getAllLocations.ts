import { FnController } from 'app/routeHandler'
import { FnGetAllLocations } from 'services/location/getAllLocations'
import utils from 'utils'

interface Dependencies {
  getAll: FnGetAllLocations
}

const createGetAllController = ({ getAll }: Dependencies): FnController => {
  return async (req, res) => {
    const { id } = req.params
    const { result: locations, error } = await getAll(id)

    if (error) {
      return utils.sendErrorResponse(res, {}, error)
    }

    return utils.sendSuccessResponse(res, { locations }, 'Here you go!')
  }
}
export default createGetAllController
