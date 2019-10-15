
import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
    vehicleList: [],
    currentVehicle: null
}

export const VehicleReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_VECHILES_SUCCESS:
        return {
          ...state,
          vehicleList: action.payload 
        }
      case ACTION_TYPES.SET_CURRENT_VEHICLE:
        return {
          ...state,
          currentVehicle: action.payload
        }
      case ACTION_TYPES.FETCH_CAMERAS_FAILURE:
        return {
          ...state,
          cameraList: []
        }
      default:
        return state
    }
}