import * as ACTION_TYPES from '../actions/action_types'

export const initialState = {
    phone_numbers: [],
}

export const NotificationReducer = (state = initialState, action) => {
    switch(action.type) {
      case ACTION_TYPES.FETCH_PHONE_NUMBERS:
        return {
          ...state,
          phone_numbers: action.payload 
        }
      default:
        return state
    }
}