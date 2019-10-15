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
  console.log("CURRENT: ", currentCamera);
  return {
    type : ACTION_TYPES.SET_CURRENT_CAMERA,
    payload: currentCamera
  }
}