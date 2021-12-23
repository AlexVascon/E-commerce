import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
} from '../constants/userConstants'

export const registerReducer = (state = {}, action) => {
  switch (action.type) {
    case REGISTRATION_REQUEST:
      return { registerLoading: true }
    case REGISTER_SUCCESS:
      return { registerLoading: false, registeredUser: action.payload }
    case REGISTER_FAIL:
      return { registerLoading: false, registerError: action.payload }
    default:
      return state
  }
}