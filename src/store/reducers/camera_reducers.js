import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
    cameraList: [],
    currentCamera: null
}

export const CameraReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_CAMERAS_SUCCESS:
        return {
          ...state,
          cameraList: action.payload 
        }
      case ACTION_TYPES.SET_CURRENT_CAMERA:
        return {
          ...state,
          currentCamera: action.payload
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