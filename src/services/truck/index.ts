import { ITruckModel } from 'data-access/mongodb'
import createAddTruck, { FnAddTruck } from './addTruck'
import createEditTruck, { FnEditTruck } from './editTruck'
import getAllTrucks, { FnGetAllTrucks } from './getAllTrucks'
import createViewruck, { FnViewTruck } from './viewTruck'

export interface ITruckService {
  getAll: FnGetAllTrucks
  addTruck: FnAddTruck
  editTruck: FnEditTruck
  viewTruck: FnViewTruck
}

const createTruckService = ({ Truck }: ITruckModel): ITruckService => {
  const getAll = getAllTrucks({
    Truck
  })

  const addTruck = createAddTruck({
    Truck
  })

  const editTruck = createEditTruck({
    Truck
  })

  const viewTruck = createViewruck({
    Truck
  })

  return Object.freeze({
    getAll,
    addTruck,
    editTruck,
    viewTruck
  })
}

export default createTruckService
