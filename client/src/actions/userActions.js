import instance from '../service/api'
import {
  REGISTRATION_REQUEST,
  REGISTER_SUCCESS,
  REGISTER_FAIL,
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  AUTHENTICATION_REQUEST,
  AUTHENTICATION_SUCCESS,
  AUTHENTICATION_FAIL,
  SAVE_SHIPPING_REQUEST,
  SAVE_SHIPPING_SUCCESS,
  SAVE_SHIPPING_FAIL,
  FETCH_SHIPPING_REQUEST,
  FETCH_SHIPPING_SUCCESS,
  FETCH_SHIPPING_FAIL
} from '../constants/userConstants'

export const register = (username, email, password, confirmPassword) => async (dispatch) => {
  try {
    dispatch({type: REGISTRATION_REQUEST})
    const body = { username, email, password , confirmPassword}
    const { data } = await instance.post('/user/register',body)
    localStorage.setItem('accessToken', data)
    const validationToken = await instance.get('/user/verify')
    dispatch({ type: REGISTER_SUCCESS, payload: validationToken })
  } catch (error) {
    dispatch({
      type: REGISTER_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const login = (usernameOrEmail, password) => async (dispatch) => {
  try {
    dispatch({type: LOGIN_REQUEST})
    const body = { 
      usernameOrEmail: usernameOrEmail, 
      password: password 
    }
    const { data } = await instance.post('/user/login',body)
    localStorage.setItem('accessToken', data)
    const validationToken = await instance.get('/user/verify')
    dispatch({ type: LOGIN_SUCCESS, payload: validationToken })
  } catch (error) {
    dispatch({
      type: LOGIN_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
};

export const authenticate = () => async (dispatch) => {
  try {
    dispatch({type: AUTHENTICATION_REQUEST})
    const validationToken = await instance.get('/user/verify')
    if (!validationToken) dispatch({ type: AUTHENTICATION_FAIL, payload: false })
    else dispatch({ type: AUTHENTICATION_SUCCESS, payload: true })
  } catch (error) {
    dispatch({
      type: AUTHENTICATION_FAIL,
      payload: false
    })
  }
}

export const saveShippingInformation = (shippingInformation) => async (dispatch) => {
  try {
    dispatch({type: SAVE_SHIPPING_REQUEST})
    const body = {
      fullName: shippingInformation.fullName,
      phoneNumber: shippingInformation.phoneNumber,
      email: shippingInformation.email,
      country: shippingInformation.country,
      city: shippingInformation.city,
      province: shippingInformation.province,
      postCode: shippingInformation.postCode,
      streetAddress: shippingInformation.streetAddress
    }
    const { data } = await instance.post('/user/shipping/save', body)
    dispatch({type: SAVE_SHIPPING_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: SAVE_SHIPPING_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    })
  }
}

export const fetchShippingInformation = () => async (dispatch) => {
  try {
    dispatch({type: FETCH_SHIPPING_REQUEST})
    const { data } = await instance.get('/user/shipping-information')
    dispatch({type: FETCH_SHIPPING_SUCCESS, payload: data })
  } catch (error) {
    dispatch({
      type: FETCH_SHIPPING_FAIL,
      payload:
        error.response && error.response.data.messages
          ? error.response.data.messages
          : error.messages,
    });
  }
}