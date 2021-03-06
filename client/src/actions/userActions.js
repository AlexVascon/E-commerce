import instance from '../service/api'
import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT_REQUEST,
  LOGOUT_SUCCESS,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  EDIT_USER_REQUEST,
  EDIT_USER_SUCCESS,
  EDIT_USER_FAIL,
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
  DELETE_USER_FAIL,
} from '../constants/userConstants'

export const register =
  (username, email, password, confirmPassword) => async (dispatch) => {
    try {
      dispatch({ type: REGISTRATION_REQUEST })
      const anonymousCart = JSON.parse(localStorage.getItem('anonymousCart'))
      const cartItems = anonymousCart ? anonymousCart.cart : null
      const body = { username, email, password, confirmPassword, cartItems }
      const { data } = await instance.post('/user/register', body)
      localStorage.setItem('accessToken', data)
      const validationToken = await instance.get('/user/verify')
      dispatch({ type: REGISTER_SUCCESS, payload: validationToken })
    } catch (error) {
      dispatch({
        type: REGISTER_FAIL,
        payload:
          error.response && error.response.data.messages
            ? error.response.data.messages
            : error.message,
      })
    }
  }

export const login = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST })
    const body = {
      usernameOrEmail: usernameOrEmail,
      password: password,
    }
    const { data } = await instance.post('/user/login', body)
    localStorage.setItem('accessToken', data)
    const validationToken = await instance.get('/user/verify')
    dispatch({ type: LOGIN_SUCCESS, payload: validationToken })
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const logout = () => (dispatch) => {
  dispatch({ type: LOGOUT_REQUEST })
  localStorage.removeItem('accessToken')
  dispatch({ type: LOGOUT_SUCCESS })
  document.location.href = '/portal'
}

export const authenticate = () => async (dispatch) => {
  try {
    dispatch({ type: AUTHENTICATION_REQUEST })
    if (localStorage.getItem('accessToken')) {
      const { data } = await instance.get('/user/verify')
      dispatch({ type: AUTHENTICATION_SUCCESS, payload: data })
    } else {
      dispatch({ type: AUTHENTICATION_FAIL, payload: { message: 'no user' } })
    }
  } catch (error) {
    const message =
      error.response && error.response.data.messages
        ? error.response.data.messages
        : error.message
    if (message === 'Not authorized, token failed') {
      dispatch(logout())
    }
    dispatch({
      type: AUTHENTICATION_FAIL,
      payload: message,
    })
  }
}

export const userEdit = (user) => async (dispatch) => {
  try {
    dispatch({ type: EDIT_USER_REQUEST })
    const { data } = await instance.put('/user/edit', user)
    dispatch({ type: EDIT_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: EDIT_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const saveShippingInformation =
  (shippingInformation) => async (dispatch) => {
    try {
      dispatch({ type: SAVE_SHIPPING_REQUEST })
      const body = {
        fullName: shippingInformation.fullName,
        phoneNumber: shippingInformation.phoneNumber,
        email: shippingInformation.email,
        country: shippingInformation.country,
        city: shippingInformation.city,
        province: shippingInformation.province,
        postCode: shippingInformation.postCode,
        streetAddress: shippingInformation.streetAddress,
      }
      const { data } = await instance.post('/user/shipping/save', body)
      dispatch({ type: SAVE_SHIPPING_SUCCESS, payload: data })
    } catch (error) {
      dispatch({
        type: SAVE_SHIPPING_FAIL,
        payload:
          error.response && error.response.data.messages
            ? error.response.data.messages
            : error.message,
      })
    }
  }

export const fetchShippingInformation = () => async (dispatch) => {
  try {
    dispatch({ type: FETCH_SHIPPING_REQUEST })
    const { data } = await instance.get('/user/shipping-information')
    dispatch({ type: FETCH_SHIPPING_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_SHIPPING_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const fetchAllUsers = (page) => async (dispatch) => {
  try {
    dispatch({ type: FETCH_ALL_USERS_REQUEST })
    const { data } = await instance.get(`/user/all?page=${page + 1}&limit=10`)
    dispatch({ type: FETCH_ALL_USERS_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_ALL_USERS_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}

export const deleteUser = (userId) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST })
    const { data } = await instance.delete(`/user/${userId}`)
    dispatch({ type: DELETE_USER_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: DELETE_USER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.message,
    })
  }
}
