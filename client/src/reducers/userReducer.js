import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
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

export const authenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return { authenticationLoading: true }
    case AUTHENTICATION_SUCCESS:
      return { authenticationLoading: false, verified: action.payload }
    case AUTHENTICATION_FAIL:
      return { authenticationLoading: false, authenticationError: action.payload }
    default:
      return state
  }
}