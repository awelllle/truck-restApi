/* eslint-disable prettier/prettier */
import { ITruckService } from 'services/truck'
import { FnController } from 'app/routeHandler'
import createAddTruckController from './addTruckController'
import createEditTruckController from './editTruckController'
import createViewTruckController from './viewTruckController'
import createGetAllController from './getAllController'

interface Dependecies {
  truckService: ITruckService
}

interface IVehicleApi {
  addTruckController: FnController
  editTruckController: FnController
  viewTruckController: FnController
  getAllController: FnController
}
const createTruckApi = ({ truckService }: Dependecies): IVehicleApi => {
  const {  addTruck, editTruck, viewTruck, getAll } = truckService


  const addTruckController = createAddTruckController({
    addTruck
  })

  const editTruckController = createEditTruckController({
    editTruck,
  })

  const viewTruckController = createViewTruckController({
    viewTruck,
  })

  const getAllController = createGetAllController({
    getAll
  })

  return Object.freeze({
    addTruckController,
    editTruckController,
    viewTruckController,
    getAllController
  })
}

export default createTruckApi
