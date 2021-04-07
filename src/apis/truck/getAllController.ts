import { FnController } from 'app/routeHandler'
import { FnGetAllTrucks } from 'services/truck/getAllTrucks'
import utils from 'utils'

interface Dependencies {
  getAll: FnGetAllTrucks
}

const createGetAllController = ({ getAll }: Dependencies): FnController => {
  return async (_, res) => {
    const { result: trucks, error } = await getAll()

    if (error) {
      return utils.sendErrorResponse(res, {}, error)
    }

    return utils.sendSuccessResponse(
      res,
      { trucks },
      'Here are all the trucks!'
    )
  }
}
export default createGetAllController
