import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  SAVE_SHIPPING_REQUEST,
  SAVE_SHIPPING_SUCCESS,
  SAVE_SHIPPING_FAIL,
  FETCH_SHIPPING_REQUEST,
  FETCH_SHIPPING_SUCCESS,
  FETCH_SHIPPING_FAIL,
  FETCH_ALL_USERS_REQUEST,
  FETCH_ALL_USERS_SUCCESS,
  FETCH_ALL_USERS_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL
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

export const loginReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGIN_REQUEST:
      return { loadingLogin: true }
    case LOGIN_SUCCESS:
      return { loadingLogin: false, loggedUser: action.payload }
    case LOGIN_FAIL:
      return { loadingLogin: false, loginError: action.payload }
    default:
      return state
  }
}

export const logoutReducer = (state = {}, action) => {
  switch (action.type) {
    case LOGOUT_REQUEST:
      return { loadingLogout: true }
    case LOGOUT_SUCCESS:
      return { loadingLogout: false, loggedOut: true }
    default:
      return state
  }
}

export const authenticationReducer = (state = {}, action) => {
  switch (action.type) {
    case AUTHENTICATION_REQUEST:
      return { authenticationLoading: true }
    case AUTHENTICATION_SUCCESS:
      return { authenticationLoading: false, userInfo: action.payload }
    case AUTHENTICATION_FAIL:
      return { authenticationLoading: false, authenticationError: action.payload }
    default:
      return state
  }
}

export const editUserReducer = (state = {}, action) => {
  switch (action.type) {
    case EDIT_USER_REQUEST:
      return { loadingEditUser: true }
    case EDIT_USER_SUCCESS:
      return { loadingEditUser: false, editUserSuccess: action.payload }
    case EDIT_USER_FAIL:
      return { loadingEditUser: false, editUserError: action.payload }
    default:
      return state
  }
}

export const deleteUserReducer = (state = {}, action) => {
  switch (action.type) {
    case DELETE_USER_REQUEST:
      return { loadingDeleteUser: true }
    case DELETE_USER_SUCCESS:
      return { loadingDeleteUser: false, deleteUserSuccess: action.payload }
    case DELETE_USER_FAIL:
      return { loadingDeleteUser: false, deleteUserError: action.payload }
    default:
      return state
  }
}

export const saveShippingInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case SAVE_SHIPPING_REQUEST:
      return { loadingSaveShipping: true }
    case SAVE_SHIPPING_SUCCESS:
      return { loadingSaveShipping: false, saveShippingInformationSuccess: action.payload }
    case SAVE_SHIPPING_FAIL:
      return { loadingSaveShipping: false, saveShippingInformationError: action.payload }
    default:
      return state
  }
}

export const fetchShippingInformationReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_SHIPPING_REQUEST:
      return { fetchShippingInformationLoading: true }
    case FETCH_SHIPPING_SUCCESS:
      return { fetchShippingInformationLoading: false, shippingInformation: action.payload }
    case FETCH_SHIPPING_FAIL:
      return { fetchShippingInformationLoading: false, fetchShippingInformationError: action.payload }
    default:
      return state
  }
}

export const fetchAllUsersReducer = (state = {}, action) => {
  switch (action.type) {
    case FETCH_ALL_USERS_REQUEST:
      return { loadingFetchAllUsers: true }
    case FETCH_ALL_USERS_SUCCESS:
      return { loadingFetchAllUsers: false, allUsers: action.payload }
    case FETCH_ALL_USERS_FAIL:
      return { loadingFetchAllUsers: false, fetchAllUsersError: action.payload }
    default:
      return state
  }
}

