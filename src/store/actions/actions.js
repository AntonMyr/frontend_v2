import * as ACTION_TYPES from './action_types'

export const SUCCESS = {
  type: ACTION_TYPES.SUCCESS
}

export const FAILURE = {
  type: ACTION_TYPES.FAILURE
}


export const success = () => {
  return {
    type: ACTION_TYPES.SUCCESS
  }
}

export const failure = () => {
  return {
    type: ACTION_TYPES.FAILURE
  }
}



export const login_success = () => {
  return {
    type: ACTION_TYPES.LOGIN_SUCCESS
  }
}

export const login_failure = () => {
  return {
    type: ACTION_TYPES.LOGIN_FAILURE
  }
}


export const add_profile = (profile) => {
  return {
    type: ACTION_TYPES.ADD_PROFILE,
    payload: profile
  }
}

export const remove_profile = () => {
  return {
    type: ACTION_TYPES.REMOVE_PROFILE
  }
}

export const user_input_change = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_CHANGE,
    payload: text
  }
}

export const user_input_submit = (text) => {
  return {
    type: ACTION_TYPES.USER_INPUT_SUBMIT,
    payload: text
  }
}

export const fetch_cameras_success = (cameras) => {
  return {
    type: ACTION_TYPES.FETCH_CAMERAS_SUCCESS,
    payload: cameras
  }
}

export const fetch_cameras_failure = () => {
  return {
    type: ACTION_TYPES.FETCH_CAMERAS_failure
  }
}

export const set_current_camera = (currentCamera) => {
  return {
    type : ACTION_TYPES.SET_CURRENT_CAMERA,
    payload: currentCamera
  }
}

export const fetch_vehicles_success = (vehicles) => {
  return {
    type: ACTION_TYPES.FETCH_VEHICLES_SUCCESS,
    payload: vehicles
  }
}

export const set_current_vehicle = (vehicle) => {
  return {
    type : ACTION_TYPES.SET_CURRENT_VEHICLE,
    payload: vehicle
  }
}

export const fetch_phone_numbers = (phone_numbers) => {
  return {
    type: ACTION_TYPES.FETCH_PHONE_NUMBERS,
    payload: phone_numbers
  }
}